import { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import toast from 'react-hot-toast';

const RecordButton = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob, recordingTime);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Reset
        setRecordingTime(0);
        clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to start recording. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] border ${
          isRecording
            ? 'bg-accent-rose hover:brightness-[0.96] border-transparent shadow-soft'
            : 'bg-brand-600 hover:bg-brand-700 border-transparent shadow-soft'
        }`}
      >
        {isRecording ? (
          <Square className="text-white" size={48} />
        ) : (
          <Mic className="text-white" size={48} />
        )}
      </button>

      {isRecording && (
        <div className="text-center">
          <div className="text-3xl font-serif text-ink mb-1">
            {formatTime(recordingTime)}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-accent-rose rounded-full animate-pulse"></div>
            <span className="text-sm text-ink-muted">Recording…</span>
          </div>
        </div>
      )}

      {!isRecording && (
        <p className="text-ink-muted text-center max-w-xs">
          Tap the microphone to start recording your thoughts, lectures, or reminders
        </p>
      )}
    </div>
  );
};

export default RecordButton;
