import { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    // TODO: Implement actual voice recognition
    if (!isListening) {
      setTranscript('मुझे अपने पास का प्लंबर चाहिए...');
    } else {
      setTranscript('');
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-lg border">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Voice Search</h3>
        <p className="text-muted-foreground mb-6">
          Speak in your preferred language to find local services
        </p>

        {/* Voice Button */}
        <div className="relative mb-6">
          <Button
            onClick={toggleListening}
            size="lg"
            className={`w-20 h-20 rounded-full ${
              isListening 
                ? 'bg-accent hover:bg-accent-dark animate-pulse' 
                : 'bg-gradient-primary hover:opacity-90'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>

          {/* Voice Waveform Animation */}
          {isListening && (
            <div className="absolute -inset-4 flex items-center justify-center">
              <div className="voice-wave">
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '30px', animationDelay: '0.1s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '25px', animationDelay: '0.2s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '35px', animationDelay: '0.3s' }} />
                <div className="w-1 bg-accent rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="min-h-[60px] flex items-center justify-center">
          {isListening ? (
            <div className="text-accent font-medium flex items-center gap-2">
              <Volume2 className="w-5 h-5 animate-pulse" />
              Listening...
            </div>
          ) : transcript ? (
            <div className="text-foreground bg-muted p-3 rounded-lg max-w-sm">
              "{transcript}"
            </div>
          ) : (
            <p className="text-muted-foreground">
              Tap the microphone and speak your query
            </p>
          )}
        </div>

        {/* Language Options */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['हिंदी', 'English', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ'].map((lang) => (
            <Button key={lang} variant="outline" size="sm" className="rounded-full">
              {lang}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;