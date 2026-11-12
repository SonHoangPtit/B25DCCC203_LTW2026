import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { START_SCORE, MIN_BET, MAX_BET, BET_STEP, TIME_PER_QUESTION, formatScore } from '../data';
import { validateBet, calcChange, getResult } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';
import Supports from '../components/Supports';

const Play = ({ questions, playerName, addHistory }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [bet, setBet] = useState(MIN_BET);
  const [status, setStatus] = useState('betting'); // betting | answering | revealed
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [lastFeedback, setLastFeedback] = useState('');

  // Quyền trợ giúp
  const [usedPreview, setUsedPreview] = useState(false);
  const [usedShield, setUsedShield] = useState(false);
  const [usedHint, setUsedHint] = useState(false);

  const [previewActive, setPreviewActive] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);
  const [hintActive, setHintActive] = useState(false);

  const currentQuestion = questions[currentIndex];
  const betError = validateBet(bet, score);

  const handlePlaceBet = useCallback(() => {
    if (validateBet(bet, score)) return;
    setSelectedIndex(null);
    setTimeLeft(TIME_PER_QUESTION);
    setStatus('answering');
  }, [bet, score]);

  const evaluateAnswer = useCallback(
    (chosenIdx) => {
      const numericBet = Number(bet);
      const isCorrect = chosenIdx === currentQuestion.answer;
      let change = calcChange(numericBet, currentQuestion.level, isCorrect);
      let feedback = '';

      if (isCorrect) {
        feedback = `+${formatScore(change)}`;
      } else if (shieldActive) {
        change = 0;
        feedback = 'Bảo hiểm: không bị trừ điểm';
      } else {
        feedback = `-${formatScore(Math.abs(change))}`;
      }

      const newScore = score + change;
      setSelectedIndex(chosenIdx);
      setScore(newScore);
      setLastFeedback(feedback);
      setStatus('revealed');

      setRounds((prev) => [
        ...prev,
        {
          id: currentQuestion.id,
          bet: numericBet,
          correct: isCorrect,
          change,
          scoreAfter: newScore,
        },
      ]);
    },
    [bet, currentQuestion, shieldActive, score]
  );

  // Đồng hồ 25 giây ở bước trả lời
  useEffect(() => {
    if (status !== 'answering') return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          evaluateAnswer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, evaluateAnswer]);

  // Chờ 2 giây sau khi hiện đáp án để chuyển câu hoặc kết thúc
  useEffect(() => {
    if (status !== 'revealed') return;

    const timeoutId = setTimeout(() => {
      const isBankrupt = score < MIN_BET;
      const isFinished = currentIndex + 1 >= questions.length;

      if (isBankrupt || isFinished) {
        const correctCount = rounds.filter((r) => r.correct).length;
        const reason = isBankrupt ? 'bankrupt' : 'completed';
        const resultTitle = getResult(score);

        addHistory({
          id: Date.now(),
          name: playerName.trim(),
          finalScore: score,
          correctCount,
          played: rounds.length,
          result: resultTitle,
          playedAt: new Date().toLocaleString('vi-VN'),
        });

        navigate('/result', {
          replace: true,
          state: {
            name: playerName.trim(),
            rounds,
            finalScore: score,
            correctCount,
            reason,
          },
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setBet(MIN_BET);
        setPreviewActive(false);
        setShieldActive(false);
        setHintActive(false);
        setLastFeedback('');
        setStatus('betting');
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [status, score, currentIndex, questions.length, rounds, addHistory, playerName, navigate]);

  // Phím tắt mũi tên lên/xuống và Enter ở bước đặt cược
  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'betting') return;

      const maxAllowed = Math.floor(Math.min(MAX_BET, score) / BET_STEP) * BET_STEP;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setBet((prev) => Math.min(Number(prev) + BET_STEP, Math.max(MIN_BET, maxAllowed)));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setBet((prev) => Math.max(Number(prev) - BET_STEP, MIN_BET));
      } else if (e.key === 'Enter') {
        if (!validateBet(bet, score)) {
          e.preventDefault();
          handlePlaceBet();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, score, bet, handlePlaceBet]);

  // Cập nhật document.title động & cleanup
  useEffect(() => {
    if (!currentQuestion) return;
    if (status === 'betting') {
      document.title = `Câu ${currentIndex + 1}/${questions.length} – đặt cược`;
    } else {
      document.title = `Câu ${currentIndex + 1}/${questions.length} – cược ${bet}`;
    }

    return () => {
      document.title = 'Đặt cược kiến thức';
    };
  }, [status, currentIndex, questions.length, bet, currentQuestion]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) return null;

  return (
    <div>
      <Supports
        status={status}
        usedPreview={usedPreview}
        usedShield={usedShield}
        usedHint={usedHint}
        shieldActive={shieldActive}
        onUsePreview={() => {
          setUsedPreview(true);
          setPreviewActive(true);
        }}
        onUseShield={() => {
          setUsedShield(true);
          setShieldActive(true);
        }}
        onUseHint={() => {
          setUsedHint(true);
          setHintActive(true);
        }}
      />

      {status === 'betting' ? (
        <BetPanel
          index={currentIndex}
          total={questions.length}
          question={currentQuestion}
          score={score}
          bet={bet}
          setBet={setBet}
          errorMsg={betError}
          onPlaceBet={handlePlaceBet}
          previewActive={previewActive}
        />
      ) : (
        <div>
          <ScoreInfo score={score} bet={Number(bet)} />
          {status === 'answering' && <Timer timeLeft={timeLeft} />}
          <QuestionCard
            index={currentIndex}
            total={questions.length}
            question={currentQuestion}
            status={status}
            selectedIndex={selectedIndex}
            onSelect={evaluateAnswer}
            hintActive={hintActive}
          />
          {status === 'revealed' && (
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: lastFeedback.startsWith('+') || lastFeedback.startsWith('Bảo hiểm') ? '#16a34a' : '#dc2626',
              }}
            >
              {lastFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Play;