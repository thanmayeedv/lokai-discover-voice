import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageCode = 'en-US' | 'hi-IN' | 'kn-IN' | 'te-IN' | 'ta-IN';

interface Translations {
  [key: string]: {
    [key in LanguageCode]: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': {
    'en-US': 'Home',
    'hi-IN': 'होम',
    'kn-IN': 'ಮುಖಪುಟ',
    'te-IN': 'హోమ్',
    'ta-IN': 'முகப்பு',
  },
  'nav.services': {
    'en-US': 'Services',
    'hi-IN': 'सेवाएं',
    'kn-IN': 'ಸೇವೆಗಳು',
    'te-IN': 'సేవలు',
    'ta-IN': 'சேவைகள்',
  },
  'nav.cart': {
    'en-US': 'Cart',
    'hi-IN': 'कार्ट',
    'kn-IN': 'ಕಾರ್ಟ್',
    'te-IN': 'కార్ట్',
    'ta-IN': 'வண்டி',
  },
  'nav.orders': {
    'en-US': 'Orders',
    'hi-IN': 'ऑर्डर',
    'kn-IN': 'ಆದೇಶಗಳು',
    'te-IN': 'ఆర్డర్లు',
    'ta-IN': 'ஆர்டர்கள்',
  },
  'nav.favorites': {
    'en-US': 'Favorites',
    'hi-IN': 'पसंदीदा',
    'kn-IN': 'ಮೆಚ್ಚಿನವುಗಳು',
    'te-IN': 'ఇష్టమైనవి',
    'ta-IN': 'பிடித்தவை',
  },
  'nav.dashboard': {
    'en-US': 'Dashboard',
    'hi-IN': 'डैशबोर्ड',
    'kn-IN': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'te-IN': 'డాష్‌బోర్డ్',
    'ta-IN': 'டாஷ்போர்டு',
  },
  'nav.addService': {
    'en-US': 'Add Service',
    'hi-IN': 'सेवा जोड़ें',
    'kn-IN': 'ಸೇವೆ ಸೇರಿಸಿ',
    'te-IN': 'సేవ జోడించు',
    'ta-IN': 'சேவை சேர்',
  },
  'nav.manageUsers': {
    'en-US': 'Manage Users',
    'hi-IN': 'उपयोगकर्ता प्रबंधित करें',
    'kn-IN': 'ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ',
    'te-IN': 'వినియోగదారులను నిర్వహించు',
    'ta-IN': 'பயனர்களை நிர்வகி',
  },
  'nav.analytics': {
    'en-US': 'Analytics',
    'hi-IN': 'विश्लेषण',
    'kn-IN': 'ವಿಶ್ಲೇಷಣೆ',
    'te-IN': 'విశ్లేషణలు',
    'ta-IN': 'பகுப்பாய்வு',
  },
  'nav.help': {
    'en-US': 'Help',
    'hi-IN': 'मदद',
    'kn-IN': 'ಸಹಾಯ',
    'te-IN': 'సహాయం',
    'ta-IN': 'உதவி',
  },
  'nav.signIn': {
    'en-US': 'Sign In',
    'hi-IN': 'साइन इन',
    'kn-IN': 'ಸೈನ್ ಇನ್',
    'te-IN': 'సైన్ ఇన్',
    'ta-IN': 'உள்நுழை',
  },
  'nav.signOut': {
    'en-US': 'Sign Out',
    'hi-IN': 'साइन आउट',
    'kn-IN': 'ಸೈನ್ ಔಟ್',
    'te-IN': 'సైన్ అవుట్',
    'ta-IN': 'வெளியேறு',
  },
  'nav.profileSettings': {
    'en-US': 'Profile Settings',
    'hi-IN': 'प्रोफ़ाइल सेटिंग्स',
    'kn-IN': 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'te-IN': 'ప్రొఫైల్ సెట్టింగ్‌లు',
    'ta-IN': 'சுயவிவர அமைப்புகள்',
  },
  'nav.searchPlaceholder': {
    'en-US': 'Search for services in your area...',
    'hi-IN': 'अपने क्षेत्र में सेवाएं खोजें...',
    'kn-IN': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...',
    'te-IN': 'మీ ప్రాంతంలో సేవలను వెతకండి...',
    'ta-IN': 'உங்கள் பகுதியில் சேவைகளைத் தேடுங்கள்...',
  },

  // Hero
  'hero.hyperlocal': {
    'en-US': 'Hyperlocal Discovery',
    'hi-IN': 'स्थानीय खोज',
    'kn-IN': 'ಸ್ಥಳೀಯ ಶೋಧನೆ',
    'te-IN': 'స్థానిక అన్వేషణ',
    'ta-IN': 'உள்ளூர் கண்டுபிடிப்பு',
  },
  'hero.discover': {
    'en-US': 'Discover',
    'hi-IN': 'खोजें',
    'kn-IN': 'ಅನ್ವೇಷಿಸಿ',
    'te-IN': 'కనుగొనండి',
    'ta-IN': 'கண்டறியுங்கள்',
  },
  'hero.somethingLokai': {
    'en-US': 'something LokAI',
    'hi-IN': 'कुछ LokAI',
    'kn-IN': 'ಏನಾದರೂ LokAI',
    'te-IN': 'ఏదైనా LokAI',
    'ta-IN': 'ஏதாவது LokAI',
  },
  'hero.description': {
    'en-US': 'Find trusted local services in your neighborhood using AI-powered voice search. Speak in your language, get instant recommendations.',
    'hi-IN': 'AI-संचालित वॉयस सर्च का उपयोग करके अपने पड़ोस में विश्वसनीय स्थानीय सेवाएं खोजें। अपनी भाषा में बोलें, तुरंत सिफारिशें पाएं।',
    'kn-IN': 'AI-ಚಾಲಿತ ಧ್ವನಿ ಹುಡುಕಾಟವನ್ನು ಬಳಸಿ ನಿಮ್ಮ ನೆರೆಹೊರೆಯಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ।',
    'te-IN': 'AI-ఆధారిత వాయిస్ సెర్చ్ ఉపయోగించి మీ పొరుగులో నమ్మదగిన స్థానిక సేవలను కనుగొనండి।',
    'ta-IN': 'AI-இயக்கப்படும் குரல் தேடலைப் பயன்படுத்தி உங்கள் அக்கம்பக்கத்தில் நம்பகமான உள்ளூர் சேவைகளைக் கண்டறியுங்கள்।',
  },
  'hero.serviceProviders': {
    'en-US': '10K+ Service Providers',
    'hi-IN': '10K+ सेवा प्रदाता',
    'kn-IN': '10K+ ಸೇವಾ ಪೂರೈಕೆದಾರರು',
    'te-IN': '10K+ సేవా ప్రదాతలు',
    'ta-IN': '10K+ சேவை வழங்குநர்கள்',
  },
  'hero.avgRating': {
    'en-US': '4.8 Average Rating',
    'hi-IN': '4.8 औसत रेटिंग',
    'kn-IN': '4.8 ಸರಾಸರಿ ರೇಟಿಂಗ್',
    'te-IN': '4.8 సగటు రేటింగ్',
    'ta-IN': '4.8 சராசரி மதிப்பீடு',
  },
  'hero.neighborhoods': {
    'en-US': '500+ Neighborhoods',
    'hi-IN': '500+ पड़ोस',
    'kn-IN': '500+ ನೆರೆಹೊರೆಗಳು',
    'te-IN': '500+ పొరుగు ప్రాంతాలు',
    'ta-IN': '500+ சுற்றுப்புறங்கள்',
  },
  'hero.getStarted': {
    'en-US': 'Get Started Free',
    'hi-IN': 'मुफ्त शुरू करें',
    'kn-IN': 'ಉಚಿತ ಪ್ರಾರಂಭಿಸಿ',
    'te-IN': 'ఉచితంగా ప్రారంభించండి',
    'ta-IN': 'இலவசமாக தொடங்குங்கள்',
  },
  'hero.learnMore': {
    'en-US': 'Learn More',
    'hi-IN': 'और जानें',
    'kn-IN': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'te-IN': 'మరింత తెలుసుకోండి',
    'ta-IN': 'மேலும் அறிய',
  },

  // Service Categories
  'categories.title': {
    'en-US': 'Popular Services',
    'hi-IN': 'लोकप्रिय सेवाएं',
    'kn-IN': 'ಜನಪ್ರಿಯ ಸೇವೆಗಳು',
    'te-IN': 'ప్రసిద్ధ సేవలు',
    'ta-IN': 'பிரபலமான சேவைகள்',
  },
  'categories.description': {
    'en-US': 'Find trusted local service providers in your neighborhood. All verified and rated by your community.',
    'hi-IN': 'अपने पड़ोस में विश्वसनीय स्थानीय सेवा प्रदाताओं को खोजें। सभी सत्यापित और आपके समुदाय द्वारा रेटेड।',
    'kn-IN': 'ನಿಮ್ಮ ನೆರೆಹೊರೆಯಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಥಳೀಯ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಹುಡುಕಿ।',
    'te-IN': 'మీ పొరుగులో నమ్మదగిన స్థానిక సేవా ప్రదాతలను కనుగొనండి।',
    'ta-IN': 'உங்கள் அக்கம்பக்கத்தில் நம்பகமான உள்ளூர் சேவை வழங்குநர்களைக் கண்டறியுங்கள்।',
  },
  'categories.plumber': {
    'en-US': 'Plumber',
    'hi-IN': 'प्लंबर',
    'kn-IN': 'ಪ್ಲಂಬರ್',
    'te-IN': 'ప్లంబర్',
    'ta-IN': 'குழாய் பணியாளர்',
  },
  'categories.plumberDesc': {
    'en-US': 'Pipes, leaks, repairs',
    'hi-IN': 'पाइप, रिसाव, मरम्मत',
    'kn-IN': 'ಪೈಪ್‌ಗಳು, ಸೋರಿಕೆಗಳು, ದುರಸ್ತಿಗಳು',
    'te-IN': 'పైపులు, లీక్‌లు, మరమ్మత్తులు',
    'ta-IN': 'குழாய்கள், கசிவுகள், பழுதுபார்ப்பு',
  },
  'categories.kirani': {
    'en-US': 'Kirani Store',
    'hi-IN': 'किराना दुकान',
    'kn-IN': 'ಕಿರಾಣಿ ಅಂಗಡಿ',
    'te-IN': 'కిరాణా షాపు',
    'ta-IN': 'மளிகைக் கடை',
  },
  'categories.kiraniDesc': {
    'en-US': 'Groceries, daily needs',
    'hi-IN': 'किराना, दैनिक जरूरतें',
    'kn-IN': 'ದಿನಸಿ, ದೈನಂದಿನ ಅಗತ್ಯಗಳು',
    'te-IN': 'కిరాణా, రోజువారీ అవసరాలు',
    'ta-IN': 'மளிகை, தினசரி தேவைகள்',
  },
  'categories.tutor': {
    'en-US': 'Tutor',
    'hi-IN': 'शिक्षक',
    'kn-IN': 'ಶಿಕ್ಷಕ',
    'te-IN': 'ట్యూటర్',
    'ta-IN': 'ஆசிரியர்',
  },
  'categories.tutorDesc': {
    'en-US': 'Home tutoring, classes',
    'hi-IN': 'होम ट्यूशन, कक्षाएं',
    'kn-IN': 'ಮನೆ ಟ್ಯೂಷನ್, ತರಗತಿಗಳು',
    'te-IN': 'హోమ్ ట్యూషన్, క్లాసులు',
    'ta-IN': 'வீட்டு பயிற்சி, வகுப்புகள்',
  },
  'categories.electrician': {
    'en-US': 'Electrician',
    'hi-IN': 'इलेक्ट्रीशियन',
    'kn-IN': 'ಎಲೆಕ್ಟ್ರಿಷಿಯನ್',
    'te-IN': 'ఎలక్ట్రీషియన్',
    'ta-IN': 'மின் தொழிலாளி',
  },
  'categories.electricianDesc': {
    'en-US': 'Wiring, appliances',
    'hi-IN': 'वायरिंग, उपकरण',
    'kn-IN': 'ವೈರಿಂಗ್, ಉಪಕರಣಗಳು',
    'te-IN': 'వైరింగ్, ఉపకరణాలు',
    'ta-IN': 'வயரிங், சாதனங்கள்',
  },
  'categories.mechanic': {
    'en-US': 'Mechanic',
    'hi-IN': 'मैकेनिक',
    'kn-IN': 'ಮೆಕ್ಯಾನಿಕ್',
    'te-IN': 'మెకానిక్',
    'ta-IN': 'மெக்கானிக்',
  },
  'categories.mechanicDesc': {
    'en-US': 'Vehicle repairs',
    'hi-IN': 'वाहन मरम्मत',
    'kn-IN': 'ವಾಹನ ದುರಸ್ತಿ',
    'te-IN': 'వాహన మరమ్మత్తు',
    'ta-IN': 'வாகன பழுதுபார்ப்பு',
  },
  'categories.cook': {
    'en-US': 'Cook',
    'hi-IN': 'खाना बनाने वाला',
    'kn-IN': 'ಅಡುಗೆಯವರು',
    'te-IN': 'వంటవాడు',
    'ta-IN': 'சமையல்காரர்',
  },
  'categories.cookDesc': {
    'en-US': 'Home cooking, catering',
    'hi-IN': 'घर का खाना, कैटरिंग',
    'kn-IN': 'ಮನೆ ಅಡುಗೆ, ಕ್ಯಾಟರಿಂಗ್',
    'te-IN': 'ఇంటి వంట, క్యాటరింగ్',
    'ta-IN': 'வீட்டு சமையல், கேட்டரிங்',
  },

  // Services Page
  'services.title': {
    'en-US': 'Available Services',
    'hi-IN': 'उपलब्ध सेवाएं',
    'kn-IN': 'ಲಭ್ಯವಿರುವ ಸೇವೆಗಳು',
    'te-IN': 'అందుబాటులో ఉన్న సేవలు',
    'ta-IN': 'கிடைக்கும் சேவைகள்',
  },
  'services.searchResults': {
    'en-US': 'Search Results',
    'hi-IN': 'खोज परिणाम',
    'kn-IN': 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು',
    'te-IN': 'శోధన ఫలితాలు',
    'ta-IN': 'தேடல் முடிவுகள்',
  },
  'services.noResults': {
    'en-US': 'No services found. New vendor services require admin approval before appearing here.',
    'hi-IN': 'कोई सेवा नहीं मिली। नई विक्रेता सेवाओं को यहां दिखाई देने से पहले व्यवस्थापक अनुमोदन की आवश्यकता है।',
    'kn-IN': 'ಯಾವುದೇ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ। ಹೊಸ ಮಾರಾಟಗಾರ ಸೇವೆಗಳಿಗೆ ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳಲು ನಿರ್ವಾಹಕ ಅನುಮೋದನೆ ಅಗತ್ಯವಿದೆ।',
    'te-IN': 'సేవలు కనుగొనబడలేదు. కొత్త విక్రేత సేవలకు ఇక్కడ కనిపించడానికి అడ్మిన్ ఆమోదం అవసరం.',
    'ta-IN': 'சேவைகள் எதுவும் கிடைக்கவில்லை. புதிய விற்பனையாளர் சேவைகள் இங்கு தோன்ற நிர்வாகி ஒப்புதல் தேவை.',
  },
  'services.loading': {
    'en-US': 'Loading services...',
    'hi-IN': 'सेवाएं लोड हो रही हैं...',
    'kn-IN': 'ಸೇವೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    'te-IN': 'సేవలను లోడ్ చేస్తోంది...',
    'ta-IN': 'சேவைகள் ஏற்றப்படுகின்றன...',
  },
  'services.approved': {
    'en-US': 'Approved',
    'hi-IN': 'स्वीकृत',
    'kn-IN': 'ಅನುಮೋದಿಸಲಾಗಿದೆ',
    'te-IN': 'ఆమోదించబడింది',
    'ta-IN': 'அங்கீகரிக்கப்பட்டது',
  },

  // Voice Search
  'voice.speakNow': {
    'en-US': 'Speak now...',
    'hi-IN': 'अभी बोलें...',
    'kn-IN': 'ಈಗ ಮಾತನಾಡಿ...',
    'te-IN': 'ఇప్పుడు మాట్లాడండి...',
    'ta-IN': 'இப்போது பேசுங்கள்...',
  },
  'voice.tapToSpeak': {
    'en-US': 'Tap to speak',
    'hi-IN': 'बोलने के लिए टैप करें',
    'kn-IN': 'ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    'te-IN': 'మాట్లాడటానికి నొక్కండి',
    'ta-IN': 'பேச தட்டவும்',
  },
  'voice.searching': {
    'en-US': 'Searching...',
    'hi-IN': 'खोज रहे हैं...',
    'kn-IN': 'ಹುಡುಕುತ್ತಿದೆ...',
    'te-IN': 'వెతుకుతోంది...',
    'ta-IN': 'தேடுகிறது...',
  },

  // Common
  'common.user': {
    'en-US': 'User',
    'hi-IN': 'उपयोगकर्ता',
    'kn-IN': 'ಬಳಕೆದಾರ',
    'te-IN': 'వినియోగదారు',
    'ta-IN': 'பயனர்',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('en-US');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation['en-US'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
