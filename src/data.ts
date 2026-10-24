import { LearningModule } from "./types";

export const STATIC_MODULES: LearningModule[] = [
  {
    id: "es-essentials",
    title: "Spanish Essentials",
    description: "Master everyday greetings, common questions, and polite phrases to begin speaking Spanish confidently.",
    language: "Spanish",
    flag: "🇪🇸",
    level: "Beginner",
    category: "Conversational Basics",
    cards: [
      {
        id: "es-1",
        foreignTerm: "Hola, ¿cómo estás?",
        englishTranslation: "Hello, how are you?",
        pronunciation: "OH-lah, KOH-moh es-TAHS",
        exampleSentenceForeign: "Hola, ¿cómo estás? Hace tiempo que no te veo.",
        exampleSentenceEnglish: "Hello, how are you? I haven't seen you in a while.",
        quizOptions: ["Hello, how are you?", "Good morning, what is your name?", "Thank you very much, goodbye.", "Where is the nearest restaurant?"],
        correctAnswerIndex: 0
      },
      {
        id: "es-2",
        foreignTerm: "Muchas gracias por tu ayuda",
        englishTranslation: "Thank you very much for your help",
        pronunciation: "MOO-chahs GRAH-syahs por too ah-YOO-dah",
        exampleSentenceForeign: "Muchas gracias por tu ayuda con las maletas.",
        exampleSentenceEnglish: "Thank you very much for your help with the suitcases.",
        quizOptions: ["Can you help me with this?", "Thank you very much for your help", "You are very welcome, my friend", "Excuse me, where is the bathroom?"],
        correctAnswerIndex: 1
      },
      {
        id: "es-3",
        foreignTerm: "¿Dónde está la estación de tren?",
        englishTranslation: "Where is the train station?",
        pronunciation: "DOHN-deh es-TAH lah es-tah-SYOHN deh tren",
        exampleSentenceForeign: "¿Disculpe, dónde está la estación de tren más cercana?",
        exampleSentenceEnglish: "Excuse me, where is the nearest train station?",
        quizOptions: ["How much does the train ticket cost?", "When does the train arrive?", "Is this the train to Madrid?", "Where is the train station?"],
        correctAnswerIndex: 3
      },
      {
        id: "es-4",
        foreignTerm: "Me gustaría pedir un café con leche",
        englishTranslation: "I would like to order a coffee with milk",
        pronunciation: "meh goo-stah-REE-ah peh-DEER oon kah-FEH kon LEH-cheh",
        exampleSentenceForeign: "Buenos días, me gustaría pedir un café con leche y un cruasán.",
        exampleSentenceEnglish: "Good morning, I would like to order a coffee with milk and a croissant.",
        quizOptions: ["Do you have hot coffee with milk?", "I would like to order a coffee with milk", "I don't like coffee with milk", "Please bring me a cup of tea"],
        correctAnswerIndex: 1
      },
      {
        id: "es-5",
        foreignTerm: "Lo siento, no entiendo",
        englishTranslation: "I'm sorry, I don't understand",
        pronunciation: "loh SYEN-toh, noh en-TYEN-doh",
        exampleSentenceForeign: "¿Puede repetir eso, por favor? Lo siento, no entiendo.",
        exampleSentenceEnglish: "Can you repeat that, please? I'm sorry, I don't understand.",
        quizOptions: ["I'm sorry, I don't understand", "I do not speak Spanish well", "What did you say just now?", "Please speak more slowly"],
        correctAnswerIndex: 0
      },
      {
        id: "es-6",
        foreignTerm: "¿Cuánto cuesta este libro?",
        englishTranslation: "How much does this book cost?",
        pronunciation: "KWAHN-toh KWEHS-tah EHS-teh LEE-broh",
        exampleSentenceForeign: "¿Disculpe, cuánto cuesta este libro de español?",
        exampleSentenceEnglish: "Excuse me, how much does this Spanish book cost?",
        quizOptions: ["What is the name of this book?", "How much does this book cost?", "Can I borrow this book?", "Where can I buy a book?"],
        correctAnswerIndex: 1
      },
      {
        id: "es-7",
        foreignTerm: "¿Hablas inglés?",
        englishTranslation: "Do you speak English?",
        pronunciation: "AH-blahs een-GLEHS",
        exampleSentenceForeign: "Hola, lo siento, no hablo bien español, ¿hablas inglés?",
        exampleSentenceEnglish: "Hello, I am sorry, I do not speak Spanish well, do you speak English?",
        quizOptions: ["Do you speak English?", "Do you live around here?", "What language do you speak?", "Can you translate this?"],
        correctAnswerIndex: 0
      },
      {
        id: "es-8",
        foreignTerm: "Buenos días, mucho gusto",
        englishTranslation: "Good morning, nice to meet you",
        pronunciation: "BWEH-nohs DEE-ahs, MOO-choh GOOS-toh",
        exampleSentenceForeign: "Buenos días, mucho gusto en conocerle señor Pérez.",
        exampleSentenceEnglish: "Good morning, nice to meet you Mr. Perez.",
        quizOptions: ["Good afternoon, goodbye", "Good morning, nice to meet you", "Have a great evening", "Welcome to our school"],
        correctAnswerIndex: 1
      },
      {
        id: "es-9",
        foreignTerm: "¿Dónde está el baño, por favor?",
        englishTranslation: "Where is the bathroom, please?",
        pronunciation: "DOHN-deh es-TAH el BAH-nyoh, por fah-VOR",
        exampleSentenceForeign: "Disculpe señor, ¿dónde está el baño, por favor?",
        exampleSentenceEnglish: "Excuse me sir, where is the bathroom, please?",
        quizOptions: ["Where is the hotel lobby?", "Where is the exit door?", "Where is the bathroom, please?", "How do I open this door?"],
        correctAnswerIndex: 2
      },
      {
        id: "es-10",
        foreignTerm: "¿Me puedes ayudar?",
        englishTranslation: "Can you help me?",
        pronunciation: "meh PWEH-dehs ah-yoo-DAR",
        exampleSentenceForeign: "Hola, estoy perdido, ¿me puedes ayudar?",
        exampleSentenceEnglish: "Hello, I am lost, can you help me?",
        quizOptions: ["Do you want to help?", "Can you help me?", "Where are you going?", "Is this correct?"],
        correctAnswerIndex: 1
      },
      {
        id: "es-11",
        foreignTerm: "Adiós, ¡que tengas un buen día!",
        englishTranslation: "Goodbye, have a nice day!",
        pronunciation: "ah-DYOHS, keh TEHN-gahs oon bwen DEE-ah",
        exampleSentenceForeign: "Gracias por la comida, adiós, ¡que tengas un buen día!",
        exampleSentenceEnglish: "Thank you for the meal, goodbye, have a nice day!",
        quizOptions: ["Goodbye, have a nice day!", "Welcome back to Spain", "See you later tonight", "Good night and sweet dreams"],
        correctAnswerIndex: 0
      },
      {
        id: "es-12",
        foreignTerm: "Sí, por supuesto",
        englishTranslation: "Yes, of course",
        pronunciation: "see, por soo-PWEHS-toh",
        exampleSentenceForeign: "¿Puedo sentarme aquí? Sí, por supuesto.",
        exampleSentenceEnglish: "Can I sit here? Yes, of course.",
        quizOptions: ["No, absolutely not", "Maybe later today", "Yes, of course", "I don't think so"],
        correctAnswerIndex: 2
      },
      {
        id: "es-13",
        foreignTerm: "No sé dónde está",
        englishTranslation: "I do not know where it is",
        pronunciation: "noh seh DOHN-deh es-TAH",
        exampleSentenceForeign: "Lo siento, no sé dónde está el museo.",
        exampleSentenceEnglish: "I'm sorry, I do not know where the museum is.",
        quizOptions: ["I know exactly where it is", "It is right around the corner", "I do not know where it is", "Can you show me on the map?"],
        correctAnswerIndex: 2
      },
      {
        id: "es-14",
        foreignTerm: "¿Qué hora es?",
        englishTranslation: "What time is it?",
        pronunciation: "keh OH-rah es",
        exampleSentenceForeign: "Disculpe, ¿me podría decir qué hora es?",
        exampleSentenceEnglish: "Excuse me, could you tell me what time it is?",
        quizOptions: ["What day is it today?", "What time is it?", "When does the train leave?", "How long does it take?"],
        correctAnswerIndex: 1
      },
      {
        id: "es-15",
        foreignTerm: "¡Felicidades por tu éxito!",
        englishTranslation: "Congratulations on your success!",
        pronunciation: "feh-lee-see-DAH-dehs por too EHK-see-toh",
        exampleSentenceForeign: "¡Felicidades por tu éxito en el examen de español!",
        exampleSentenceEnglish: "Congratulations on your success on the Spanish exam!",
        quizOptions: ["Congratulations on your success!", "Good luck with your interview!", "Happy birthday to you!", "Cheers to a long healthy life!"],
        correctAnswerIndex: 0
      },
      {
        id: "es-16",
        foreignTerm: "Buenas noches, que descanses",
        englishTranslation: "Good night, rest well",
        pronunciation: "BWEH-nahs NOH-chehs, keh dehs-KAHN-sehs",
        exampleSentenceForeign: "Me voy a dormir, buenas noches, que descanses.",
        exampleSentenceEnglish: "I am going to sleep, good night, rest well.",
        quizOptions: ["Good afternoon, nice to see you", "Goodbye, see you tomorrow morning", "Good night, rest well", "Have a pleasant breakfast"],
        correctAnswerIndex: 2
      },
      {
        id: "es-17",
        foreignTerm: "Por favor, habla más despacio",
        englishTranslation: "Please, speak more slowly",
        pronunciation: "por fah-VOR, AH-blah mahs dehs-PAH-syoh",
        exampleSentenceForeign: "Hablamos muy rápido, por favor, habla más despacio.",
        exampleSentenceEnglish: "We speak very fast, please, speak more slowly.",
        quizOptions: ["Please, speak more slowly", "Please repeat that sentence", "Could you translate this word?", "I understand everything you say"],
        correctAnswerIndex: 0
      },
      {
        id: "es-18",
        foreignTerm: "Hace mucho frío hoy",
        englishTranslation: "It is very cold today",
        pronunciation: "AH-seh MOO-choh FREE-oh oy",
        exampleSentenceForeign: "No quiero salir hoy, hace mucho frío hoy.",
        exampleSentenceEnglish: "I don't want to go out today, it is very cold today.",
        quizOptions: ["It is very sunny today", "It is raining heavily today", "It is very hot today", "It is very cold today"],
        correctAnswerIndex: 3
      },
      {
        id: "es-19",
        foreignTerm: "¿De dónde eres tú?",
        englishTranslation: "Where are you from?",
        pronunciation: "deh DOHN-deh EH-rehs too",
        exampleSentenceForeign: "Hola, me llamo Juan, ¿de dónde eres tú?",
        exampleSentenceEnglish: "Hello, my name is Juan, where are you from?",
        quizOptions: ["Where do you live?", "Where are you going?", "Where are you from?", "What is your nationality?"],
        correctAnswerIndex: 2
      },
      {
        id: "es-20",
        foreignTerm: "Me gusta mucho esta comida",
        englishTranslation: "I really like this food",
        pronunciation: "meh GOOS-tah MOO-choh EHS-tah koh-MEE-dah",
        exampleSentenceForeign: "Este restaurante es excelente, me gusta mucho esta comida.",
        exampleSentenceEnglish: "This restaurant is excellent, I really like this food.",
        quizOptions: ["I want to order more food", "I really like this food", "This food is too spicy", "Is the food ready yet?"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "hi-basics",
    title: "Hindi Everyday Basics",
    description: "Learn fundamental greetings, essential pronouns, and helpful day-to-day survival phrases in Hindi.",
    language: "Hindi",
    flag: "🇮🇳",
    level: "Beginner",
    category: "Conversational Basics",
    cards: [
      {
        id: "hi-1",
        foreignTerm: "नमस्ते, आपका नाम क्या है?",
        englishTranslation: "Hello, what is your name?",
        pronunciation: "Nah-mah-stay, aap-kah naam kya hai?",
        exampleSentenceForeign: "नमस्ते, आपका नाम क्या है? मेरा नाम रमेश है।",
        exampleSentenceEnglish: "Hello, what is your name? My name is Ramesh.",
        quizOptions: ["Hello, what is your name?", "Where is the train station?", "Thank you for the tea.", "How much does this cost?"],
        correctAnswerIndex: 0
      },
      {
        id: "hi-2",
        foreignTerm: "धन्यवाद",
        englishTranslation: "Thank you",
        pronunciation: "Dhahn-yah-vaad",
        exampleSentenceForeign: "आपकी मदद के लिए बहुत-बहुत धन्यवाद।",
        exampleSentenceEnglish: "Thank you very much for your help.",
        quizOptions: ["Welcome", "Thank you", "Goodbye", "Please speak slowly"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-3",
        foreignTerm: "आप कैसे हैं?",
        englishTranslation: "How are you?",
        pronunciation: "Aap kai-say hain?",
        exampleSentenceForeign: "नमस्ते भाई साहब, आप कैसे हैं?",
        exampleSentenceEnglish: "Hello brother, how are you?",
        quizOptions: ["Where are you going?", "How are you?", "What time is it?", "Excuse me, I am lost"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-4",
        foreignTerm: "मैं ठीक हूँ",
        englishTranslation: "I am fine",
        pronunciation: "Main theek hoon",
        exampleSentenceForeign: "चिंता मत करो, मैं ठीक हूँ।",
        exampleSentenceEnglish: "Do not worry, I am fine.",
        quizOptions: ["I am hungry", "I don't know", "I am fine", "Where is the bathroom?"],
        correctAnswerIndex: 2
      },
      {
        id: "hi-5",
        foreignTerm: "सुप्रभात",
        englishTranslation: "Good morning",
        pronunciation: "Soo-prah-bhaat",
        exampleSentenceForeign: "पिताजी, सुप्रभात! आज का मौसम बहुत अच्छा है।",
        exampleSentenceEnglish: "Good morning, father! The weather is very nice today.",
        quizOptions: ["Good morning", "Good evening", "Good night", "See you again"],
        correctAnswerIndex: 0
      },
      {
        id: "hi-6",
        foreignTerm: "शुभ रात्रि",
        englishTranslation: "Good night",
        pronunciation: "Shubh raa-three",
        exampleSentenceForeign: "अब सोने का समय हो गया है, शुभ रात्रि!",
        exampleSentenceEnglish: "It is time to sleep now, good night!",
        quizOptions: ["Good afternoon", "Congratulations", "Goodbye, have a nice day!", "Good night"],
        correctAnswerIndex: 3
      },
      {
        id: "hi-7",
        foreignTerm: "फिर मिलेंगे",
        englishTranslation: "See you again",
        pronunciation: "Phir mee-layn-gay",
        exampleSentenceForeign: "यात्रा सुरक्षित रहे, फिर मिलेंगे!",
        exampleSentenceEnglish: "Have a safe journey, see you again!",
        quizOptions: ["Nice to meet you", "See you again", "I am sorry", "Yes, of course"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-8",
        foreignTerm: "माफ़ कीजिए",
        englishTranslation: "Excuse me / Sorry",
        pronunciation: "Maaf kee-jee-yay",
        exampleSentenceForeign: "माफ़ कीजिए, क्या मुझे रास्ता मिल सकता है?",
        exampleSentenceEnglish: "Excuse me, could I get past?",
        quizOptions: ["Please help me", "Where is the exit?", "Excuse me / Sorry", "Yes, please"],
        correctAnswerIndex: 2
      },
      {
        id: "hi-9",
        foreignTerm: "हाँ, मुझे पता है",
        englishTranslation: "Yes, I know",
        pronunciation: "Haan, moo-jhay pah-tah hai",
        exampleSentenceForeign: "हाँ, मुझे पता है कि वह कहाँ रहता है।",
        exampleSentenceEnglish: "Yes, I know where he lives.",
        quizOptions: ["Yes, I know", "No, I do not know", "What is the time?", "I really like this food"],
        correctAnswerIndex: 0
      },
      {
        id: "hi-10",
        foreignTerm: "नहीं, मुझे नहीं पता",
        englishTranslation: "No, I do not know",
        pronunciation: "Nah-heen, moo-jhay nah-heen pah-tah",
        exampleSentenceForeign: "क्षमा करें, नहीं, मुझे नहीं पता कि चाबी कहाँ है।",
        exampleSentenceEnglish: "Sorry, no, I do not know where the key is.",
        quizOptions: ["Yes, of course", "Can you help me?", "I do not understand", "No, I do not know"],
        correctAnswerIndex: 3
      },
      {
        id: "hi-11",
        foreignTerm: "कृपया मेरी मदद करें",
        englishTranslation: "Please help me",
        pronunciation: "Kree-pyah may-ree mah-dahd kah-rayn",
        exampleSentenceForeign: "मैं संकट में हूँ, कृपया मेरी मदद करें!",
        exampleSentenceEnglish: "I am in trouble, please help me!",
        quizOptions: ["Where is the station?", "Please help me", "Thank you very much", "Goodbye and rest well"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-12",
        foreignTerm: "यह कितने का है?",
        englishTranslation: "How much is this?",
        pronunciation: "Yeh keeth-nay kah hai?",
        exampleSentenceForeign: "भैया, यह सेब का पैकेट कितने का है?",
        exampleSentenceEnglish: "Brother, how much is this packet of apples?",
        quizOptions: ["What is this called?", "How much is this?", "Where can I buy a book?", "Is the museum open today?"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-13",
        foreignTerm: "शौचालय कहाँ है?",
        englishTranslation: "Where is the restroom?",
        pronunciation: "Shau-chaa-lay kah-haan hai?",
        exampleSentenceForeign: "क्षमा करें, यहाँ पास में शौचालय कहाँ है?",
        exampleSentenceEnglish: "Excuse me, where is the restroom nearby?",
        quizOptions: ["Where is the restaurant?", "Where is the restroom?", "Where is the taxi stand?", "How do I open this door?"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-14",
        foreignTerm: "मुझे भूख लगी है",
        englishTranslation: "I am hungry",
        pronunciation: "Moo-jhay bhookh lah-gee hai",
        exampleSentenceForeign: "चलो खाना खाते हैं, मुझे बहुत भूख लगी है।",
        exampleSentenceEnglish: "Let us eat food, I am very hungry.",
        quizOptions: ["I want to sleep", "I am lost", "I am hungry", "I really like this food"],
        correctAnswerIndex: 2
      },
      {
        id: "hi-15",
        foreignTerm: "पानी चाहिए",
        englishTranslation: "I want water",
        pronunciation: "Paa-nee chaa-hee-yay",
        exampleSentenceForeign: "गला सूख रहा है, मुझे थोड़ा पानी चाहिए।",
        exampleSentenceEnglish: "My throat is dry, I want some water.",
        quizOptions: ["I want water", "I would like coffee", "Please bring the bill", "This is very cold"],
        correctAnswerIndex: 0
      },
      {
        id: "hi-16",
        foreignTerm: "आपका स्वागत है",
        englishTranslation: "You are welcome",
        pronunciation: "Aap-kah swaa-gaht hai",
        exampleSentenceForeign: "धन्यवाद बोलने की आवश्यकता नहीं, आपका स्वागत है!",
        exampleSentenceEnglish: "No need to say thank you, you are welcome!",
        quizOptions: ["Congratulations on your success!", "Goodbye, have a nice day!", "You are welcome", "Nice to meet you too"],
        correctAnswerIndex: 2
      },
      {
        id: "hi-17",
        foreignTerm: "क्या आप अंग्रेज़ी बोलते हैं?",
        englishTranslation: "Do you speak English?",
        pronunciation: "Kya aap ahn-gray-zee bohl-thay hain?",
        exampleSentenceForeign: "मुझे हिंदी कम आती है, क्या आप अंग्रेज़ी बोलते हैं?",
        exampleSentenceEnglish: "I know little Hindi, do you speak English?",
        quizOptions: ["Do you speak English?", "What language do you speak?", "Where are you from?", "Do you live here?"],
        correctAnswerIndex: 0
      },
      {
        id: "hi-18",
        foreignTerm: "मुझे समझ नहीं आया",
        englishTranslation: "I did not understand",
        pronunciation: "Moo-jhay sah-mahjh nah-heen aa-yah",
        exampleSentenceForeign: "कृपया फिर से कहें, मुझे समझ नहीं आया।",
        exampleSentenceEnglish: "Please say that again, I did not understand.",
        quizOptions: ["I cannot hear you", "I did not understand", "Please speak more slowly", "What did you say?"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-19",
        foreignTerm: "धीरे बोलिए",
        englishTranslation: "Speak slowly",
        pronunciation: "Dhee-ray boh-lee-yay",
        exampleSentenceForeign: "आप बहुत तेज़ बोल रहे हैं, कृपया थोड़ा धीरे बोलिए।",
        exampleSentenceEnglish: "You are speaking very fast, please speak a little slowly.",
        quizOptions: ["Please repeat that", "Speak slowly", "Thank you for the help", "I know exactly where it is"],
        correctAnswerIndex: 1
      },
      {
        id: "hi-20",
        foreignTerm: "बहुत अच्छा",
        englishTranslation: "Very good",
        pronunciation: "Bah-hut ahch-chah",
        exampleSentenceForeign: "आपका गृहकार्य बहुत अच्छा है!",
        exampleSentenceEnglish: "Your homework is very good!",
        quizOptions: ["No, not at all", "Yes, of course", "Very good", "I really like this food"],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    id: "fr-travel",
    title: "French Travel & Directions",
    description: "Master vital phrases for finding your way around, booking transport, and navigating French cities.",
    language: "French",
    flag: "🇫🇷",
    level: "Intermediate",
    category: "Travel & Navigation",
    cards: [
      {
        id: "fr-1",
        foreignTerm: "Où se trouve le guichet ?",
        englishTranslation: "Where is the ticket office?",
        pronunciation: "Oo suh troov luh gee-shay ?",
        exampleSentenceForeign: "Excusez-moi, où se trouve le guichet pour acheter des billets de métro ?",
        exampleSentenceEnglish: "Excuse me, where is the ticket office to buy subway tickets?",
        quizOptions: ["Where can I buy water?", "Where is the ticket office?", "Where does the train leave?", "How much is the subway ticket?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-2",
        foreignTerm: "Un billet aller-retour pour Paris, s'il vous plaît",
        englishTranslation: "A round-trip ticket to Paris, please",
        pronunciation: "Uh bee-yay ah-lay-ruh-toor poor Pah-ree, seel voo play",
        exampleSentenceForeign: "Je voudrais un billet aller-retour pour Paris, s'il vous plaît.",
        exampleSentenceEnglish: "I would like a round-trip ticket to Paris, please.",
        quizOptions: ["A one-way ticket to Paris, please", "Which platform is the train to Paris?", "A round-trip ticket to Paris, please", "I missed the train to Paris"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-3",
        foreignTerm: "Pouvez-vous m'indiquer le chemin ?",
        englishTranslation: "Can you show me the way?",
        pronunciation: "Poo-vay-voo m'an-dee-kay luh shuh-man ?",
        exampleSentenceForeign: "Je suis perdu. Pouvez-vous m'indiquer le chemin pour aller au musée ?",
        exampleSentenceEnglish: "I am lost. Can you show me the way to get to the museum?",
        quizOptions: ["Where is the hotel lobby?", "Can you take a picture for me?", "Can you show me the way?", "Is the museum open today?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-4",
        foreignTerm: "À quelle heure part le prochain bus ?",
        englishTranslation: "What time does the next bus leave?",
        pronunciation: "Ah kel eur par luh pro-shanh boos ?",
        exampleSentenceForeign: "S'il vous plaît, à quelle heure part le prochain bus pour l'aéroport ?",
        exampleSentenceEnglish: "Please, what time does the next bus leave for the airport?",
        quizOptions: ["How long is the bus ride?", "What time does the next bus leave?", "Where is the bus stop located?", "Does this bus go to the center?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-5",
        foreignTerm: "C'est tout droit et puis à gauche",
        englishTranslation: "It's straight ahead and then to the left",
        pronunciation: "Say too drwah ay pwee ah gohsh",
        exampleSentenceForeign: "Pour aller à la cathédrale, c'est tout droit et puis à gauche.",
        exampleSentenceEnglish: "To go to the cathedral, it's straight ahead and then to the left.",
        quizOptions: ["Turn right and then keep going straight", "It's on the other side of the street", "It's straight ahead and then to the left", "You must take a taxi to get there"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-6",
        foreignTerm: "Je voudrais réserver une chambre",
        englishTranslation: "I would like to reserve a room",
        pronunciation: "zhuh voo-dreh reh-zehr-vay een shahm-bruh",
        exampleSentenceForeign: "Bonjour, je voudrais réserver une chambre pour deux personnes.",
        exampleSentenceEnglish: "Hello, I would like to reserve a room for two people.",
        quizOptions: ["I want to cancel my reservation", "I would like to reserve a room", "Can you clean my room, please?", "What is the price of this meal?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-7",
        foreignTerm: "Excusez-moi, je suis perdu",
        englishTranslation: "Excuse me, I am lost",
        pronunciation: "ehk-skew-zay mwah, zhuh swee pehr-doo",
        exampleSentenceForeign: "Excusez-moi, je suis perdu, où est la Tour Eiffel ?",
        exampleSentenceEnglish: "Excuse me, I am lost, where is the Eiffel Tower?",
        quizOptions: ["Excuse me, I am lost", "Do you speaking English here?", "Can you show me your passport?", "I need a hotel taxi"],
        correctAnswerIndex: 0
      },
      {
        id: "fr-8",
        foreignTerm: "Combien coûte ce trajet en taxi ?",
        englishTranslation: "How much does this taxi ride cost?",
        pronunciation: "kohn-byan koot suh trah-zheh ahn tahk-see",
        exampleSentenceForeign: "Bonjour monsieur, combien coûte ce trajet en taxi jusqu'au Louvre ?",
        exampleSentenceEnglish: "Hello sir, how much does this taxi ride cost to the Louvre?",
        quizOptions: ["When will the taxi arrive?", "Where is the taxi stand?", "How much does this taxi ride cost?", "Should I tip the taxi driver?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-9",
        foreignTerm: "Pouvez-vous répéter plus lentement, s'il vous plaît ?",
        englishTranslation: "Can you repeat more slowly, please?",
        pronunciation: "poo-vay voo ray-pay-tay plee lahn-tuh-mahn, seel voo play",
        exampleSentenceForeign: "Je ne comprends pas bien. Pouvez-vous répéter plus lentement, s'il vous plaît ?",
        exampleSentenceEnglish: "I don't understand well. Can you repeat more slowly, please?",
        quizOptions: ["How do you spell this word, please?", "Can you repeat more slowly, please?", "What does this sentence mean?", "Please write down the address"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-10",
        foreignTerm: "Quel est le meilleur restaurant du quartier ?",
        englishTranslation: "What is the best restaurant in the neighborhood?",
        pronunciation: "kel eh luh meh-yeur rehs-toh-rahn dee kahr-tyay",
        exampleSentenceForeign: "Pardon, quel est le meilleur restaurant du quartier pour dîner ?",
        exampleSentenceEnglish: "Excuse me, what is the best restaurant in the neighborhood for dinner?",
        quizOptions: ["Where is the nearest bakery shop?", "Is the local restaurant open now?", "What is the best restaurant in the neighborhood?", "Do you have a table for four?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-11",
        foreignTerm: "J'ai besoin d'une carte de la ville",
        englishTranslation: "I need a map of the city",
        pronunciation: "zheh buh-zwan deen kahrt duh lah veel",
        exampleSentenceForeign: "Bonjour, j'ai besoin d'une carte de la ville, s'il vous plaît.",
        exampleSentenceEnglish: "Hello, I need a map of the city, please.",
        quizOptions: ["I want to rent a city car", "Where is the city museum?", "Can you take a picture of the city?", "I need a map of the city"],
        correctAnswerIndex: 3
      },
      {
        id: "fr-12",
        foreignTerm: "Où puis-je changer de l'argent ?",
        englishTranslation: "Where can I exchange money?",
        pronunciation: "oo pwee zhuh shahn-zhay duh l'ahr-zhahn",
        exampleSentenceForeign: "Bonjour, où puis-je changer de l'argent dans cet aéroport ?",
        exampleSentenceEnglish: "Hello, where can I exchange money in this airport?",
        quizOptions: ["Where is the nearest ATM machine?", "How much is the exchange rate?", "Where can I exchange money?", "Do you accept international cards?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-13",
        foreignTerm: "Le train a vingt minutes de retard",
        englishTranslation: "The train is twenty minutes late",
        pronunciation: "luh tran ah van mee-neet duh ruh-tahr",
        exampleSentenceForeign: "Le train pour Marseille a vingt minutes de retard aujourd'hui.",
        exampleSentenceEnglish: "The train to Marseille is twenty minutes late today.",
        quizOptions: ["The train leaves in twenty minutes", "The train is twenty minutes late", "I missed the train by twenty minutes", "Is this the train to Marseille?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-14",
        foreignTerm: "Y a-t-il un accès Wi-Fi gratuit ici ?",
        englishTranslation: "Is there free Wi-Fi access here?",
        pronunciation: "ee ah-teel uhn ahk-seh wee-fee grah-twee ee-see",
        exampleSentenceForeign: "Excusez-moi, y a-t-il un accès Wi-Fi gratuit ici au café ?",
        exampleSentenceEnglish: "Excuse me, is there free Wi-Fi access here at the cafe?",
        quizOptions: ["Is there free Wi-Fi access here?", "What is the Wi-Fi password?", "How do I connect to the local net?", "Is the computer connected to Wi-Fi?"],
        correctAnswerIndex: 0
      },
      {
        id: "fr-15",
        foreignTerm: "Je voudrais régler la facture, s'il vous plaît",
        englishTranslation: "I would like to settle the bill, please",
        pronunciation: "zhuh voo-dreh ray-glay lah fahk-tewr, seel voo play",
        exampleSentenceForeign: "Garçon, je voudrais régler la facture, s'il vous plaît.",
        exampleSentenceEnglish: "Waiter, I would like to settle the bill, please.",
        quizOptions: ["Please bring me a dessert", "I would like to settle the bill, please", "Do you accept cash payments?", "Is service included in the price?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-16",
        foreignTerm: "Ce plat est-il très épicé ?",
        englishTranslation: "Is this dish very spicy?",
        pronunciation: "suh plah eh-teel treh zay-pee-say",
        exampleSentenceForeign: "Je n'aime pas trop le piment. Ce plat est-il très épicé ?",
        exampleSentenceEnglish: "I don't like chili very much. Is this dish very spicy?",
        quizOptions: ["Does this dish contain seafood?", "Is this dish served hot?", "Is this dish very spicy?", "What is the name of this dish?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-17",
        foreignTerm: "Pourriez-vous appeler un taxi pour moi ?",
        englishTranslation: "Could you call a taxi for me?",
        pronunciation: "poo-ryay voo ah-play uhn tahk-see poor mwah",
        exampleSentenceForeign: "Je dois aller à la gare. Pourriez-vous appeler un taxi pour moi, s'il vous plaît ?",
        exampleSentenceEnglish: "I need to go to the station. Could you call a taxi for me, please?",
        quizOptions: ["How far is the taxi stand?", "Could you call a taxi for me?", "Can you take me to the airport?", "Is the taxi driver waiting outside?"],
        correctAnswerIndex: 1
      },
      {
        id: "fr-18",
        foreignTerm: "Le musée est ouvert aujourd'hui",
        englishTranslation: "The museum is open today",
        pronunciation: "luh mew-zay eh too-vehr oh-zhoor-dwee",
        exampleSentenceForeign: "Oui, c'est férié mais le musée est ouvert aujourd'hui.",
        exampleSentenceEnglish: "Yes, it is a holiday but the museum is open today.",
        quizOptions: ["The museum is closed today", "How much is the museum ticket?", "The museum is open today", "When does the museum close?"],
        correctAnswerIndex: 2
      },
      {
        id: "fr-19",
        foreignTerm: "Où se trouve l'arrêt de métro le plus proche ?",
        englishTranslation: "Where is the nearest metro stop?",
        pronunciation: "oo suh troov l'ah-reh duh may-troh luh plee prosh",
        exampleSentenceForeign: "S'il vous plaît, où se trouve l'arrêt de métro le plus proche ?",
        exampleSentenceEnglish: "Please, where is the nearest metro stop?",
        quizOptions: ["How do I buy a metro card?", "Which metro line goes to the center?", "Is the metro open late tonight?", "Where is the nearest metro stop?"],
        correctAnswerIndex: 3
      },
      {
        id: "fr-20",
        foreignTerm: "Merci pour votre accueil chaleureux",
        englishTranslation: "Thank you for your warm welcome",
        pronunciation: "mahr-see poor voh-truh ah-kuhy shah-luh-ruh",
        exampleSentenceForeign: "C'était un séjour magnifique. Merci pour votre accueil chaleureux !",
        exampleSentenceEnglish: "It was a magnificent stay. Thank you for your warm welcome!",
        quizOptions: ["Thank you for the delicious dinner", "Thank you for your warm welcome", "I hope to visit you again next year", "Have a pleasant return journey"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "it-dining",
    title: "Italian Dining & Art",
    description: "Explore the language of fine dining, museum exploration, and casual conversation in Italy.",
    language: "Italian",
    flag: "🇮🇹",
    level: "Intermediate",
    category: "Travel & Navigation",
    cards: [
      {
        id: "it-1",
        foreignTerm: "Vorrei prenotare un tavolo per due",
        englishTranslation: "I would like to reserve a table for two",
        pronunciation: "Vohr-ray preh-noh-tah-ray oon tah-voh-loh pair doo-ay",
        exampleSentenceForeign: "Buonasera, vorrei prenotare un tavolo per due per stasera alle otto.",
        exampleSentenceEnglish: "Good evening, I would like to reserve a table for two for tonight at eight.",
        quizOptions: ["I would like to reserve a table for two", "Where is the museum entrance?", "Please bring me the main menu.", "Is service included in the bill?"],
        correctAnswerIndex: 0
      },
      {
        id: "it-2",
        foreignTerm: "Il conto, per favore",
        englishTranslation: "The bill, please",
        pronunciation: "Eel cohn-toh, pair fah-voh-ray",
        exampleSentenceForeign: "Cameriere, possiamo avere il conto, per favore?",
        exampleSentenceEnglish: "Waiter, can we have the bill, please?",
        quizOptions: ["I would like more water, please", "The bill, please", "Can I pay by credit card?", "What is the soup of the day?"],
        correctAnswerIndex: 1
      },
      {
        id: "it-3",
        foreignTerm: "Dov'è la stazione ferroviaria?",
        englishTranslation: "Where is the railway station?",
        pronunciation: "Dohv-eh lah staht-syoh-nay fair-roh-vyah-ryah?",
        exampleSentenceForeign: "Scusi signora, dov'è la stazione ferroviaria di Santa Maria Novella?",
        exampleSentenceEnglish: "Excuse me ma'am, where is the Santa Maria Novella railway station?",
        quizOptions: ["Where is the bus stop?", "How do I buy a ticket?", "What platform does the train leave?", "Where is the railway station?"],
        correctAnswerIndex: 3
      },
      {
        id: "it-4",
        foreignTerm: "Quanto costa questo biglietto?",
        englishTranslation: "How much does this ticket cost?",
        pronunciation: "Kwahn-toh cohs-tah kweh-stoh beel-yet-toh?",
        exampleSentenceForeign: "Buongiorno, quanto costa questo biglietto per il Colosseo?",
        exampleSentenceEnglish: "Good morning, how much does this ticket for the Colosseum cost?",
        quizOptions: ["When does the museum close?", "How much does this ticket cost?", "Where is the ticket counter?", "Is there a discount for seniors?"],
        correctAnswerIndex: 1
      },
      {
        id: "it-5",
        foreignTerm: "Mi dispiace, non parlo bene l'italiano",
        englishTranslation: "I'm sorry, I don't speak Italian well",
        pronunciation: "Mee dees-pyah-chay, nohn par-loh beh-nay lee-tahl-yah-noh",
        exampleSentenceForeign: "Parli più piano, per favore. Mi dispiace, non parlo bene l'italiano.",
        exampleSentenceEnglish: "Please speak slower. I'm sorry, I don't speak Italian well.",
        quizOptions: ["I'm sorry, I don't speak Italian well", "Do you speak English here?", "Please repeat that again", "I do not understand what you said"],
        correctAnswerIndex: 0
      },
      {
        id: "it-6",
        foreignTerm: "Può ripetere, per favore?",
        englishTranslation: "Can you repeat, please?",
        pronunciation: "Pwoh ree-peh-teh-ray, pair fah-voh-ray?",
        exampleSentenceForeign: "La strada è rumorosa. Può ripetere l'indirizzo, per favore?",
        exampleSentenceEnglish: "The street is noisy. Can you repeat the address, please?",
        quizOptions: ["What is your name?", "Where is the library?", "Can you repeat, please?", "How far is the museum?"],
        correctAnswerIndex: 2
      },
      {
        id: "it-7",
        foreignTerm: "Prendo la lasagna, grazie",
        englishTranslation: "I will have the lasagna, thank you",
        pronunciation: "Prehn-doh lah lah-zahn-yah, graht-syay",
        exampleSentenceForeign: "Per primo, io prendo la lasagna, grazie.",
        exampleSentenceEnglish: "For the first course, I will have the lasagna, thank you.",
        quizOptions: ["Do you serve fresh lasagna?", "I will have the lasagna, thank you", "I don't like lasagna at all", "Is the lasagna vegetarian?"],
        correctAnswerIndex: 1
      },
      {
        id: "it-8",
        foreignTerm: "È possibile pagare con carta di credito?",
        englishTranslation: "Is it possible to pay with a credit card?",
        pronunciation: "Eh pohs-see-bee-lay pah-gah-ray cohn car-tah dee cray-dee-toh?",
        exampleSentenceForeign: "Non ho contanti. È possibile pagare con carta di credito?",
        exampleSentenceEnglish: "I don't have cash. Is it possible to pay with a credit card?",
        quizOptions: ["Is it possible to pay with a credit card?", "Do you accept international bank transfers?", "Where is the nearest ATM machine?", "Can you split the bill for us?"],
        correctAnswerIndex: 0
      },
      {
        id: "it-9",
        foreignTerm: "Dov'è il bagno?",
        englishTranslation: "Where is the bathroom?",
        pronunciation: "Dohv-eh eel bahn-yoh?",
        exampleSentenceForeign: "Scusi signore, dové il bagno per i clienti?",
        exampleSentenceEnglish: "Excuse me sir, where is the bathroom for customers?",
        quizOptions: ["Where is the emergency exit?", "Where is the main office?", "Where is the bathroom?", "Where can I wash my hands?"],
        correctAnswerIndex: 2
      },
      {
        id: "it-10",
        foreignTerm: "Questo piatto è delizioso",
        englishTranslation: "This dish is delicious",
        pronunciation: "Kweh-stoh pyat-toh eh day-lee-tsyoh-soh",
        exampleSentenceForeign: "I miei complimenti allo chef, questo piatto è delizioso!",
        exampleSentenceEnglish: "My compliments to the chef, this dish is delicious!",
        quizOptions: ["The food is too salty", "This dish is delicious", "Please bring some bread", "I would like to order this"],
        correctAnswerIndex: 1
      },
      {
        id: "it-11",
        foreignTerm: "Mi sono perso, mi può aiutare?",
        englishTranslation: "I am lost, can you help me?",
        pronunciation: "Mee soh-noh pair-soh, mee pwoh ah-yoo-tah-ray?",
        exampleSentenceForeign: "Ho spento il telefono e mi sono perso, mi può aiutare?",
        exampleSentenceEnglish: "My phone turned off and I am lost, can you help me?",
        quizOptions: ["I am lost, can you help me?", "Where is the tourist office?", "Can you show me the map?", "Do you speak English?"],
        correctAnswerIndex: 0
      },
      {
        id: "it-12",
        foreignTerm: "A che ora chiude il museo?",
        englishTranslation: "What time does the museum close?",
        pronunciation: "Ah kay oh-rah kyoo-day eel moo-zeh-oh?",
        exampleSentenceForeign: "Vorremmo visitare la galleria. A che ora chiude il museo stasera?",
        exampleSentenceEnglish: "We would like to visit the gallery. What time does the museum close tonight?",
        quizOptions: ["When does the gallery open?", "How much is the entrance ticket?", "What time does the museum close?", "Is the museum open on Sundays?"],
        correctAnswerIndex: 2
      },
      {
        id: "it-13",
        foreignTerm: "Un gelato al cioccolato, per favore",
        englishTranslation: "A chocolate gelato, please",
        pronunciation: "Oon jay-lah-toh ahl chohk-coh-lah-toh, pair fah-voh-ray",
        exampleSentenceForeign: "Fa caldissimo oggi. Un gelato al cioccolato, per favore!",
        exampleSentenceEnglish: "It is extremely hot today. A chocolate gelato, please!",
        quizOptions: ["Do you have fruit salads?", "I want lemon juice, please", "I don't like chocolate gelato", "A chocolate gelato, please"],
        correctAnswerIndex: 3
      },
      {
        id: "it-14",
        foreignTerm: "Buona giornata, a presto",
        englishTranslation: "Have a good day, see you soon",
        pronunciation: "Bwoh-nah jor-nah-tah, ah prehs-toh",
        exampleSentenceForeign: "Grazie per la bella conversazione. Buona giornata, a presto!",
        exampleSentenceEnglish: "Thank you for the nice conversation. Have a good day, see you soon!",
        quizOptions: ["Have a good day, see you soon", "Goodbye, have a pleasant trip", "Good night, sleep well", "Nice to meet you indeed"],
        correctAnswerIndex: 0
      },
      {
        id: "it-15",
        foreignTerm: "Come si dice questo in italiano?",
        englishTranslation: "How do you say this in Italian?",
        pronunciation: "Coh-may see dee-chay kweh-stoh een ee-tahl-yah-noh?",
        exampleSentenceForeign: "Voglio imparare nuovi vocaboli. Come si dice questo in italiano?",
        exampleSentenceEnglish: "I want to learn new vocabulary. How do you say this in Italian?",
        quizOptions: ["Do you understand Italian?", "How do you say this in Italian?", "Can you translate this letter?", "What language is this?"],
        correctAnswerIndex: 1
      },
      {
        id: "it-16",
        foreignTerm: "C'è un supermercato qui vicino?",
        englishTranslation: "Is there a supermarket nearby?",
        pronunciation: "Cheh oon soo-pair-mair-cah-toh kwee vee-chee-noh?",
        exampleSentenceForeign: "Dobbiamo comprare la frutta. C'è un supermercato qui vicino?",
        exampleSentenceEnglish: "We need to buy fruit. Is there a supermarket nearby?",
        quizOptions: ["Where is the local pharmacy?", "Is the bakery open now?", "Is there a supermarket nearby?", "How far is the shopping mall?"],
        correctAnswerIndex: 2
      },
      {
        id: "it-17",
        foreignTerm: "Vorrei un bicchiere di vino rosso",
        englishTranslation: "I would like a glass of red wine",
        pronunciation: "Vohr-ray oon bee-kyeh-ray dee vee-noh rohs-soh",
        exampleSentenceForeign: "Per accompagnare la bistecca, vorrei un bicchiere di vino rosso, grazie.",
        exampleSentenceEnglish: "To go with the steak, I would like a glass of red wine, please.",
        quizOptions: ["Do you have sweet white wine?", "I would like a glass of red wine", "Please bring a bottle of water", "I don't drink alcohol"],
        correctAnswerIndex: 1
      },
      {
        id: "it-18",
        foreignTerm: "Grazie mille per l'ospitalità",
        englishTranslation: "Thank you very much for the hospitality",
        pronunciation: "Graht-syay meel-lay pair lohs-pee-tahl-ee-tah",
        exampleSentenceForeign: "La vostra casa è meravigliosa. Grazie mille per l'ospitalità!",
        exampleSentenceEnglish: "Your house is wonderful. Thank you very much for the hospitality!",
        quizOptions: ["Thank you for the wonderful tour", "I had a great time hiking", "Goodbye, see you next year", "Thank you very much for the hospitality"],
        correctAnswerIndex: 3
      },
      {
        id: "it-19",
        foreignTerm: "Il treno parte dal binario quattro",
        englishTranslation: "The train leaves from platform four",
        pronunciation: "Eel treh-noh par-tay dahl bee-nah-ryoh kwat-troh",
        exampleSentenceForeign: "Fate attenzione all'annuncio: il treno parte dal binario quattro.",
        exampleSentenceEnglish: "Pay attention to the announcement: the train leaves from platform four.",
        quizOptions: ["The train is delayed by four minutes", "The train is waiting at platform two", "The train leaves from platform four", "Which platform does the train arrive on?"],
        correctAnswerIndex: 2
      },
      {
        id: "it-20",
        foreignTerm: "Che tempo fa oggi?",
        englishTranslation: "What is the weather like today?",
        pronunciation: "Kay tem-poh fah ohd-jee?",
        exampleSentenceForeign: "Dobbiamo fare una passeggiata. Che tempo fa oggi?",
        exampleSentenceEnglish: "We should go for a walk. What is the weather like today?",
        quizOptions: ["Is it going to rain tonight?", "What is the weather like today?", "It is very cold outside", "The weather is absolute perfection"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "mr-conversations",
    title: "Marathi Conversations",
    description: "Master everyday conversations, polite queries, and useful expressions for interacting in Maharashtra.",
    language: "Marathi",
    flag: "🇮🇳",
    level: "Intermediate",
    category: "Conversational Basics",
    cards: [
      {
        id: "mr-1",
        foreignTerm: "तुम्ही कसे आहात?",
        englishTranslation: "How are you?",
        pronunciation: "Tum-hi ka-say aa-haat?",
        exampleSentenceForeign: "नमस्कार काका, तुम्ही कसे आहात?",
        exampleSentenceEnglish: "Hello uncle, how are you?",
        quizOptions: ["What is your name?", "How are you?", "Where do you live?", "See you tomorrow"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-2",
        foreignTerm: "माझे नाव रमेश आहे",
        englishTranslation: "My name is Ramesh",
        pronunciation: "Maa-zay naav Ra-mesh aa-hay",
        exampleSentenceForeign: "नमस्कार, माझे नाव रमेश आहे. मी मुंबईला राहतो.",
        exampleSentenceEnglish: "Hello, my name is Ramesh. I live in Mumbai.",
        quizOptions: ["My name is Ramesh", "I am a language student", "Where is the station?", "Thank you very much"],
        correctAnswerIndex: 0
      },
      {
        id: "mr-3",
        foreignTerm: "कृपया मला मदत करा",
        englishTranslation: "Please help me",
        pronunciation: "Kroo-pa-ya ma-la ma-dat ka-ra",
        exampleSentenceForeign: "मी वाट विसरलो आहे, कृपया मला मदत करा.",
        exampleSentenceEnglish: "I have lost my way, please help me.",
        quizOptions: ["How much is this?", "Where is the bathroom?", "Please help me", "Welcome to Maharashtra"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-4",
        foreignTerm: "हे कितीला आहे?",
        englishTranslation: "How much is this?",
        pronunciation: "Hay kee-thee-la aa-hay?",
        exampleSentenceForeign: "दुकानदार काका, हे पुस्तक कितीला आहे?",
        exampleSentenceEnglish: "Shopkeeper uncle, how much is this book?",
        quizOptions: ["What is this called?", "How much is this?", "Where is the book shop?", "Is the train late today?"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-5",
        foreignTerm: "तुमचे स्वागत आहे",
        englishTranslation: "You are welcome",
        pronunciation: "Tum-chay swaa-gat aa-hay",
        exampleSentenceForeign: "घरी आल्याबद्दल तुमचे स्वागत आहे!",
        exampleSentenceEnglish: "Welcome to our home!",
        quizOptions: ["Goodbye and take care", "Happy birthday to you", "You are welcome", "Thank you for the meal"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-6",
        foreignTerm: "मला भूक लागली आहे",
        englishTranslation: "I am hungry",
        pronunciation: "Ma-la bhook laag-lee aa-hay",
        exampleSentenceForeign: "आई, खूप भूक लागली आहे, जेवण काय आहे?",
        exampleSentenceEnglish: "Mother, I am very hungry, what is for dinner?",
        quizOptions: ["I want some water", "I am going to sleep", "I am lost in the city", "I am hungry"],
        correctAnswerIndex: 3
      },
      {
        id: "mr-7",
        foreignTerm: "पाणी मिळेल का?",
        englishTranslation: "Can I get water?",
        pronunciation: "Paa-nee mee-lel ka?",
        exampleSentenceForeign: "मला खूप तहान लागली आहे, प्यायला पाणी मिळेल का?",
        exampleSentenceEnglish: "I am very thirsty, can I get some water to drink?",
        quizOptions: ["Can I get water?", "Is this tea hot?", "Please bring the bill", "Where is the hotel lobby?"],
        correctAnswerIndex: 0
      },
      {
        id: "mr-8",
        foreignTerm: "धन्यवाद, खूप खूप आभार",
        englishTranslation: "Thank you, many thanks",
        pronunciation: "Dhan-ya-vaad, khoop khoop aa-bhaar",
        exampleSentenceForeign: "माझ्या कठीण काळात मदत केल्याबद्दल धन्यवाद, खूप खूप आभार!",
        exampleSentenceEnglish: "Thank you for helping in my difficult time, many thanks!",
        quizOptions: ["Welcome back to Pune", "Thank you, many thanks", "Congratulations on your exam", "Excuse me, I don't understand"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-9",
        foreignTerm: "उद्या भेटू",
        englishTranslation: "See you tomorrow",
        pronunciation: "Ud-ya bhee-too",
        exampleSentenceForeign: "आता मी निघतो, काळजी घ्या, उद्या भेटू!",
        exampleSentenceEnglish: "I am leaving now, take care, see you tomorrow!",
        quizOptions: ["Have a nice day ahead", "How far is Mumbai?", "See you tomorrow", "Nice to meet you friend"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-10",
        foreignTerm: "मला मराठी येत नाही",
        englishTranslation: "I don't know Marathi",
        pronunciation: "Ma-la Ma-raa-thee yet naa-hee",
        exampleSentenceForeign: "मी परराज्यातून आलो आहे, मला मराठी येत नाही.",
        exampleSentenceEnglish: "I have come from another state, I don't know Marathi.",
        quizOptions: ["I don't know Marathi", "Do you speak Marathi?", "Marathi is very beautiful", "Please speak in English"],
        correctAnswerIndex: 0
      },
      {
        id: "mr-11",
        foreignTerm: "हळू बोला",
        englishTranslation: "Speak slowly",
        pronunciation: "Ha-loo bo-la",
        exampleSentenceForeign: "कृपया, मला समजण्यासाठी थोडे हळू बोला.",
        exampleSentenceEnglish: "Please, speak a little slowly so that I can understand.",
        quizOptions: ["Please repeat that sentence", "Speak slowly", "Thank you for the advice", "Where is the nearest market?"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-12",
        foreignTerm: "शौचालय कुठे आहे?",
        englishTranslation: "Where is the restroom?",
        pronunciation: "Shau-chaa-lay ku-thay aa-hay?",
        exampleSentenceForeign: "माफ करा काका, इथे आजूबाजूला शौचालय कुठे आहे?",
        exampleSentenceEnglish: "Excuse me uncle, where is the restroom around here?",
        quizOptions: ["Where is the bus stand?", "Where is the exit door?", "Where is the restroom?", "How far is the beach?"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-13",
        foreignTerm: "आज खूप थंडी आहे",
        englishTranslation: "It is very cold today",
        pronunciation: "Aaj khoop than-di aa-hay",
        exampleSentenceForeign: "स्वेटर घालून बाहेर जा, आज खूप थंडी आहे.",
        exampleSentenceEnglish: "Wear a sweater before going out, it is very cold today.",
        quizOptions: ["It is very sunny today", "It is raining heavily now", "It is extremely hot today", "It is very cold today"],
        correctAnswerIndex: 3
      },
      {
        id: "mr-14",
        foreignTerm: "मला हे आवडले",
        englishTranslation: "I liked this",
        pronunciation: "Ma-la hay aa-vad-lay",
        exampleSentenceForeign: "हे कोल्हापुरी चप्पलचे डिझाईन मला खूप आवडले.",
        exampleSentenceEnglish: "I really liked this Kolhapuri slipper design.",
        quizOptions: ["I liked this", "This is too expensive", "Can I return this item?", "Please show me another one"],
        correctAnswerIndex: 0
      },
      {
        id: "mr-15",
        foreignTerm: "तुम्ही इंग्रजी बोलता का?",
        englishTranslation: "Do you speak English?",
        pronunciation: "Tum-hi ing-ra-jee bol-ta ka?",
        exampleSentenceForeign: "मला मराठी नीट बोलता येत नाही, तुम्ही इंग्रजी बोलता का?",
        exampleSentenceEnglish: "I can't speak Marathi properly, do you speak English?",
        quizOptions: ["Do you live around here?", "Do you speak English?", "What language is this?", "Can you translate this?"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-16",
        foreignTerm: "मला समजले नाही",
        englishTranslation: "I didn't understand",
        pronunciation: "Ma-la sa-maj-lay naa-hee",
        exampleSentenceForeign: "तुम्ही काय म्हणालात? मला समजले नाही.",
        exampleSentenceEnglish: "What did you say? I didn't understand.",
        quizOptions: ["I understand everything", "Please speak faster", "I didn't understand", "Write it on the paper"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-17",
        foreignTerm: "माफ करा, उशीर झाला",
        englishTranslation: "Sorry, I am late",
        pronunciation: "Maaf ka-ra, u-sheer zhaa-la",
        exampleSentenceForeign: "ट्रॅफिकमुळे पोहोचायला वेळ लागला, माफ करा, उशीर झाला.",
        exampleSentenceEnglish: "It took time to reach due to traffic, sorry, I am late.",
        quizOptions: ["Sorry, I am late", "The bus was on time", "I missed the session", "When does the train arrive?"],
        correctAnswerIndex: 0
      },
      {
        id: "mr-18",
        foreignTerm: "तुमचा फोन नंबर काय आहे?",
        englishTranslation: "What is your phone number?",
        pronunciation: "Tum-cha phone num-ber kay aa-hay?",
        exampleSentenceForeign: "भविष्यात संपर्क साधण्यासाठी, तुमचा फोन नंबर काय आहे?",
        exampleSentenceEnglish: "For future contact, what is your phone number?",
        quizOptions: ["What is your office address?", "What is your phone number?", "Can I call you tonight?", "Do you use WhatsApp?"],
        correctAnswerIndex: 1
      },
      {
        id: "mr-19",
        foreignTerm: "येथून स्टेशन किती दूर आहे?",
        englishTranslation: "How far is the station from here?",
        pronunciation: "Yeth-oon sta-tion kee-thee door aa-hay?",
        exampleSentenceForeign: "दादा, मला रेल्वे पकडायची आहे, येथून स्टेशन किती दूर आहे?",
        exampleSentenceEnglish: "Brother, I have to catch a train, how far is the station from here?",
        quizOptions: ["What is the ticket price?", "When does the next train leave?", "How far is the station from here?", "Is this the road to the station?"],
        correctAnswerIndex: 2
      },
      {
        id: "mr-20",
        foreignTerm: "मला चहा हवा आहे",
        englishTranslation: "I want tea",
        pronunciation: "Ma-la cha-ha ha-va aa-hay",
        exampleSentenceForeign: "सकाळचे आठ वाजले आहेत, मला एक कप आले चहा हवा आहे.",
        exampleSentenceEnglish: "It is eight in the morning, I want a cup of ginger tea.",
        quizOptions: ["I want coffee instead", "Do you serve hot milk?", "I don't like tea at all", "I want tea"],
        correctAnswerIndex: 3
      }
    ]
  },
  {
    id: "ja-advanced",
    title: "Advanced Japanese Business & Culture",
    description: "Master highly respectful honorific language (Keigo), contract terminology, and business protocol in Japan.",
    language: "Japanese",
    flag: "🇯🇵",
    level: "Advanced",
    category: "Business Culture",
    cards: [
      {
        id: "ja-1",
        foreignTerm: "よろしくお願い申し上げます",
        englishTranslation: "I humbly request your continued favor / kindness",
        pronunciation: "Yoroshiku onegai mōshia gemasu",
        exampleSentenceForeign: "本日は貴重なお時間をいただき、よろしくお願い申し上げます。",
        exampleSentenceEnglish: "I humbly request your continued favor on this day where we receive your valuable time.",
        quizOptions: ["Thank you for the wonderful meal last night", "I humbly request your continued favor / kindness", "Where is the headquarters meeting room?", "Could you send me the contract drafts?"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-2",
        foreignTerm: "弊社の商品をご検討ください",
        englishTranslation: "Please consider our company's products",
        pronunciation: "Heisha no shōhin o go-kentō kudasai",
        exampleSentenceForeign: "こちらのパンフレットをご覧になり、弊社の商品をご検討ください。",
        exampleSentenceEnglish: "Please look at this brochure and consider our company's products.",
        quizOptions: ["Please consider our company's products", "We want to cancel the order immediately", "Do you have a product manual in English?", "When will the next shipment arrive?"],
        correctAnswerIndex: 0
      },
      {
        id: "ja-3",
        foreignTerm: "日程を調整していただけますか",
        englishTranslation: "Could you adjust the schedule, please?",
        pronunciation: "Nittei o chōsei shite itadakemasu ka",
        exampleSentenceForeign: "来週のミーティングにつきまして、日程を調整していただけますか。",
        exampleSentenceEnglish: "Could you adjust the schedule for next week's meeting, please?",
        quizOptions: ["What is the venue for the discussion?", "Can we cancel the weekly report?", "Could you adjust the schedule, please?", "How many attendees are confirmed?"],
        correctAnswerIndex: 2
      },
      {
        id: "ja-4",
        foreignTerm: "貴重なご意見をありがとうございます",
        englishTranslation: "Thank you very much for your valuable feedback/opinion",
        pronunciation: "Kichō na go-iken o arigatō gozaimasu",
        exampleSentenceForeign: "サービス向上に向け、貴重なご意見をありがとうございます。",
        exampleSentenceEnglish: "Thank you very much for your valuable feedback towards our service improvement.",
        quizOptions: ["We do not agree with this proposal", "Thank you very much for your valuable feedback/opinion", "Please write down your official complaints", "Where is the customer satisfaction survey?"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-5",
        foreignTerm: "今後の提携を期待しております",
        englishTranslation: "We look forward to our future partnership",
        pronunciation: "Kongo no teikei o kitai shite orimasu",
        exampleSentenceForeign: "両社の強みを活かし、今後の提携を期待しております。",
        exampleSentenceEnglish: "Utilizing the strengths of both companies, we look forward to our future partnership.",
        quizOptions: ["We plan to dissolve the contract next month", "We want to acquire your competitor company", "What is your annual business revenue target?", "We look forward to our future partnership"],
        correctAnswerIndex: 3
      },
      {
        id: "ja-6",
        foreignTerm: "打ち合わせを始めましょう",
        englishTranslation: "Let us begin the preparatory meeting",
        pronunciation: "Uchiawase o hajimemashō",
        exampleSentenceForeign: "資料の準備ができましたので、打ち合わせを始めましょう。",
        exampleSentenceEnglish: "Since the materials are ready, let us begin the preparatory meeting.",
        quizOptions: ["Let us begin the preparatory meeting", "The meeting has been postponed to tomorrow", "Where can I find the meeting minutes?", "Please turn off your phones during meetings"],
        correctAnswerIndex: 0
      },
      {
        id: "ja-7",
        foreignTerm: "承知いたしました、すぐに手配します",
        englishTranslation: "Understood, I will arrange it immediately",
        pronunciation: "Shōchi itashimashita, sugu ni tehai shimasu",
        exampleSentenceForeign: "かしこまりました。承知いたしました、すぐに手配します。",
        exampleSentenceEnglish: "Certainly. Understood, I will arrange it immediately.",
        quizOptions: ["I cannot do that right now, sorry", "Please wait for a couple of days", "Understood, I will arrange it immediately", "Where are the logistical items located?"],
        correctAnswerIndex: 2
      },
      {
        id: "ja-8",
        foreignTerm: "ご理解とご協力を感謝いたします",
        englishTranslation: "We appreciate your understanding and cooperation",
        pronunciation: "Go-rikai to go-kyōryoku o kansha itashimasu",
        exampleSentenceForeign: "本件の変更に関しまして、ご理解とご協力を感謝いたします。",
        exampleSentenceEnglish: "We appreciate your understanding and cooperation regarding the changes on this matter.",
        quizOptions: ["We demand a full explanation immediately", "Please cooperate with the local fire drill", "We do not understand this clause", "We appreciate your understanding and cooperation"],
        correctAnswerIndex: 3
      },
      {
        id: "ja-9",
        foreignTerm: "契約書の詳細を確認してください",
        englishTranslation: "Please check the details of the contract agreement",
        pronunciation: "Keiyakusho no shōsai o kakunin shite kudasai",
        exampleSentenceForeign: "ご署名いただく前に、契約書の詳細を確認してください。",
        exampleSentenceEnglish: "Please check the details of the contract agreement before signing.",
        quizOptions: ["Please check the details of the contract agreement", "Where is the original signed contract copy?", "We need to rewrite the termination clause", "Is the contract translation ready yet?"],
        correctAnswerIndex: 0
      },
      {
        id: "ja-10",
        foreignTerm: "一度社内で検討させていただきます",
        englishTranslation: "I would like to discuss this internally first",
        pronunciation: "Ichido shanei de kentō sasete itadakimasu",
        exampleSentenceForeign: "ご提案は魅力的ですが、一度社内で検討させていただきます。",
        exampleSentenceEnglish: "Your proposal is attractive, but I would like to discuss this internally first.",
        quizOptions: ["We accept your business proposal as is", "I would like to discuss this internally first", "Let's sign the contract right away", "We have rejected your proposal in our board meeting"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-11",
        foreignTerm: "誠に申し訳ございませんが、今回は見送らせていただきます",
        englishTranslation: "We are truly sorry, but we must decline this time",
        pronunciation: "Makoto ni mōshiwake gozaimasen ga, konkai wa miokurasete itadakimasu",
        exampleSentenceForeign: "慎重に検討いたしました結果、誠に申し訳ございませんが、今回は見送らせていただきます。",
        exampleSentenceEnglish: "As a result of careful consideration, we are truly sorry, but we must decline this time.",
        quizOptions: ["Thank you for choosing our services this year", "We look forward to meeting you next week", "We are truly sorry, but we must decline this time", "Please resend your project quotation"],
        correctAnswerIndex: 2
      },
      {
        id: "ja-12",
        foreignTerm: "担当者の連絡先を教えてください",
        englishTranslation: "Please let me know the contact information of the person in charge",
        pronunciation: "Tantōsha no renrakusaki o oshiete kudasai",
        exampleSentenceForeign: "本件のやり取りのため、担当者の連絡先を教えてください。",
        exampleSentenceEnglish: "Please let me know the contact information of the person in charge for coordination.",
        quizOptions: ["Who is the manager of this department?", "Please let me know the contact information of the person in charge", "Can you send me the department email list?", "Where can I find the company directory?"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-13",
        foreignTerm: "プロジェクトの進捗状況はどうですか",
        englishTranslation: "What is the progress status of the project?",
        pronunciation: "Purojekuto no shinchoku jōkyō wa dō desu ka",
        exampleSentenceForeign: "クライアントへの報告のため、プロジェクト of 進捗状況はどうですか。",
        exampleSentenceEnglish: "For reporting to our client, what is the progress status of the project?",
        quizOptions: ["When is the project deadline date?", "Has the project budget been approved?", "What is the progress status of the project?", "How many engineers are working on this?"],
        correctAnswerIndex: 2
      },
      {
        id: "ja-14",
        foreignTerm: "急な変更で大変恐縮です",
        englishTranslation: "I am extremely sorry for the sudden change",
        pronunciation: "Kyū na henkō de taihen kyōshuku desu",
        exampleSentenceForeign: "度々の急な変更で大変恐縮ですが、ご対応をお願いします。",
        exampleSentenceEnglish: "I am extremely sorry for the repeated sudden changes, but we appreciate your cooperation.",
        quizOptions: ["We appreciate the flexible adjustments", "I am extremely sorry for the sudden change", "The schedule remains exactly the same", "Please explain the reason for the delay"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-15",
        foreignTerm: "資料をメールで送付いたしました",
        englishTranslation: "I have sent the reference materials by email",
        pronunciation: "Shiryō o mēru de sōfu itashimashita",
        exampleSentenceForeign: "ミーティングの前に、資料をメールで送付いたしました。",
        exampleSentenceEnglish: "Before the meeting, I have sent the reference materials by email.",
        quizOptions: ["Please print the slides for the meeting", "Have you received the printed documents?", "Where did you save the meeting materials?", "I have sent the reference materials by email"],
        correctAnswerIndex: 3
      },
      {
        id: "ja-16",
        foreignTerm: "御社の迅速なご対応に感謝します",
        englishTranslation: "We appreciate your company's prompt response",
        pronunciation: "Onsha no jinsoku na go-taiō ni kansha shimasu",
        exampleSentenceForeign: "トラブルの際、御社の迅速なご対応に感謝します。",
        exampleSentenceEnglish: "We appreciate your company's prompt response during the system trouble.",
        quizOptions: ["We apologize for our delayed response", "We appreciate your company's prompt response", "Could you respond to our query within an hour?", "Your customer support is very slow"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-17",
        foreignTerm: "本日はお時間をいただき光栄です",
        englishTranslation: "I am honored to have your time today",
        pronunciation: "Honjitsu wa o-jikan o itadaki kōei desu",
        exampleSentenceForeign: "ご多忙中、本日はお時間をいただき光栄です。",
        exampleSentenceEnglish: "Despite your busy schedule, I am honored to have your time today.",
        quizOptions: ["Thank you for invitation to the gala", "Where should we wait for the president?", "I am honored to have your time today", "What time does your company close?"],
        correctAnswerIndex: 2
      },
      {
        id: "ja-18",
        foreignTerm: "予算の範囲内で調整が必要です",
        englishTranslation: "Adjustments are necessary within the budget limit",
        pronunciation: "Yosan no han'inei de chōsei ga hitsuyō desu",
        exampleSentenceForeign: "今回のプロジェクトは、予算 of 範囲内で調整が必要です。",
        exampleSentenceEnglish: "For this project, adjustments are necessary within the budget limit.",
        quizOptions: ["Has the final invoice been processed?", "Adjustments are necessary within the budget limit", "We have requested an additional budget", "How much is the cost of materials?"],
        correctAnswerIndex: 1
      },
      {
        id: "ja-19",
        foreignTerm: "双方にとって有益な取引を目指します",
        englishTranslation: "We aim for a mutually beneficial transaction",
        pronunciation: "Sōhō ni totte yūeki na torihiki o mezashimasu",
        exampleSentenceForeign: "私たちは、双方にとって有益な取引を目指します。",
        exampleSentenceEnglish: "We aim for a transaction that is beneficial to both parties involved.",
        quizOptions: ["We want to gain maximum profits from this", "Please sign the non-disclosure agreement first", "The transaction fees are extremely high", "We aim for a mutually beneficial transaction"],
        correctAnswerIndex: 3
      },
      {
        id: "ja-20",
        foreignTerm: "長期的なご愛顧をお願いいたします",
        englishTranslation: "We look forward to your long-term patronage",
        pronunciation: "Chōkiteki na go-aiko o onegai itashimasu",
        exampleSentenceForeign: "今後とも、長期的なご愛顧をお願いいたします。",
        exampleSentenceEnglish: "Moving forward, we look forward to your long-term patronage.",
        quizOptions: ["We hope to close this account soon", "We look forward to your long-term patronage", "What is the customer retention rate?", "Thank you for visiting our booth today"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "sa-heritage",
    title: "Sanskrit Grammar & Verses",
    description: "Deepen your linguistic roots with profound scriptural verses, declensions, and grammatical principles in Sanskrit.",
    language: "Sanskrit",
    flag: "🇮🇳",
    level: "Advanced",
    category: "Grammar & Heritage",
    cards: [
      {
        id: "sa-1",
        foreignTerm: "अहं संस्कृतं पठामि।",
        englishTranslation: "I study Sanskrit.",
        pronunciation: "Aham saṃ-skṛ-taṃ pa-ṭhā-mi.",
        exampleSentenceForeign: "प्रतिदिनं प्रातर्काले अहं संस्कृतं पठामि।",
        exampleSentenceEnglish: "Every day in the morning, I study Sanskrit.",
        quizOptions: ["You study Sanskrit.", "I study Sanskrit.", "He teaches Sanskrit.", "Sanskrit is very easy."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-2",
        foreignTerm: "भवतः नाम किम्?",
        englishTranslation: "What is your name? [to a male]",
        pronunciation: "Bha-va-taḥ nā-ma kim?",
        exampleSentenceForeign: "हे भद्र, भवतः नाम किम्?",
        exampleSentenceEnglish: "Hello gentleman, what is your name?",
        quizOptions: ["What is your name? [to a male]", "Where do you live?", "What are you studying?", "Who is your teacher?"],
        correctAnswerIndex: 0
      },
      {
        id: "sa-3",
        foreignTerm: "भवत्याः नाम किम्?",
        englishTranslation: "What is your name? [to a female]",
        pronunciation: "Bha-va-tyāḥ nā-ma kim?",
        exampleSentenceForeign: "हे भगिनि, भवत्याः नाम किम्?",
        exampleSentenceEnglish: "Hello sister, what is your name?",
        quizOptions: ["How are you doing today?", "Where is your residence?", "What is your name? [to a female]", "Can you read Sanskrit?"],
        correctAnswerIndex: 2
      },
      {
        id: "sa-4",
        foreignTerm: "सत्यमेव जयते नानृतम्।",
        englishTranslation: "Truth alone triumphs, not untruth.",
        pronunciation: "Sat-yam-eva ja-ya-te nā-nṛ-tam.",
        exampleSentenceForeign: "शास्त्रेषु कथितम्: सत्यमेव जयते नानृतम्।",
        exampleSentenceEnglish: "It is said in scriptures: Truth alone triumphs, not untruth.",
        quizOptions: ["Truth is the path of God.", "Truth alone triumphs, not untruth.", "One should speak only truth.", "Lying is a bad habit."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-5",
        foreignTerm: "वसुधैव कुटुम्बकम्।",
        englishTranslation: "The world is one family.",
        pronunciation: "Va-su-dhai-va ku-ṭum-ba-kam.",
        exampleSentenceForeign: "उदारचरितानां तु वसुधैव कुटुम्बकम्।",
        exampleSentenceEnglish: "For broad-minded people, the entire world is indeed one family.",
        quizOptions: ["We must protect our motherland.", "Family comes before everything.", "The sky is our father.", "The world is one family."],
        correctAnswerIndex: 3
      },
      {
        id: "sa-6",
        foreignTerm: "शुभमस्तु ते।",
        englishTranslation: "May blessings be with you.",
        pronunciation: "Śu-bha-mas-tu te.",
        exampleSentenceForeign: "सर्वदा आरोग्यं भवतु, शुभमस्तु ते!",
        exampleSentenceEnglish: "May you always have good health, may blessings be with you!",
        quizOptions: ["May blessings be with you.", "Have a safe train journey.", "Congratulations on your success.", "Good night and rest well."],
        correctAnswerIndex: 0
      },
      {
        id: "sa-7",
        foreignTerm: "अतिथिदेवो भव।",
        englishTranslation: "Treat the guest as God.",
        pronunciation: "A-ti-thi-de-vo bha-va.",
        exampleSentenceForeign: "भारतीयसंस्कृतौ मूलमन्त्रः: अतिथिदेवो भव।",
        exampleSentenceEnglish: "The core mantra in Indian culture is: Treat the guest as God.",
        quizOptions: ["The guest has arrived safely.", "Treat the guest as God.", "We must welcome everyone.", "Food should be served first."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-8",
        foreignTerm: "विद्वान् सर्वत्र पूज्यते।",
        englishTranslation: "A wise scholar is respected everywhere.",
        pronunciation: "Vid-vān sar-va-tra pūj-ya-te.",
        exampleSentenceForeign: "स्वदेशे पूज्यते राजा विद्वान् सर्वत्र पूज्यते।",
        exampleSentenceEnglish: "A king is respected in his own country, but a scholar is respected everywhere.",
        quizOptions: ["Kings have lots of treasures.", "Knowledge is the real wealth.", "A wise scholar is respected everywhere.", "We must read every day."],
        correctAnswerIndex: 2
      },
      {
        id: "sa-9",
        foreignTerm: "धर्मो रक्षति रक्षितः।",
        englishTranslation: "Dharma protects those who protect it.",
        pronunciation: "Dhar-mo rak-ṣa-ti rak-ṣi-taḥ.",
        exampleSentenceForeign: "सदा सदाचारं पालयन्तु, यतः धर्मो रक्षति रक्षितः।",
        exampleSentenceEnglish: "Always follow righteous conduct, because Dharma protects those who protect it.",
        quizOptions: ["Dharma protects those who protect it.", "One should do duty without fear.", "Righteousness leads to heaven.", "Protection of environment is duty."],
        correctAnswerIndex: 0
      },
      {
        id: "sa-10",
        foreignTerm: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
        englishTranslation: "Your right is to work only, never to its fruits.",
        pronunciation: "Kar-maṇ-ye-vā-dhi-kā-ras-te mā pha-le-ṣu ka-dā-ca-na.",
        exampleSentenceForeign: "भगवद्गीतायां श्रीकृष्णः वदति - कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
        exampleSentenceEnglish: "In Bhagavad Gita, Lord Krishna says: Your right is to work only, never to its fruits.",
        quizOptions: ["Work hard to achieve your dreams.", "Your right is to work only, never to its fruits.", "Results are always sweet.", "Work is worship indeed."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-11",
        foreignTerm: "विद्या ददाति विनयम्।",
        englishTranslation: "Knowledge gives humility.",
        pronunciation: "Vid-yā da-dā-ti vi-na-yam.",
        exampleSentenceForeign: "विनयेन शोभते विद्वान, यतः विद्या ददाति विनयम्।",
        exampleSentenceEnglish: "A scholar shines through modesty, because knowledge gives humility.",
        quizOptions: ["Knowledge is extremely powerful.", "Modesty is the best policy.", "Knowledge gives humility.", "Humility wins all hearts."],
        correctAnswerIndex: 2
      },
      {
        id: "sa-12",
        foreignTerm: "अहं त्वां हरामि।",
        englishTranslation: "I captivate you / take you with me.",
        pronunciation: "A-ham tvāṃ ha-rā-mi.",
        exampleSentenceForeign: "एषः मधुरः स्वरः, अहं त्वां हरामि।",
        exampleSentenceEnglish: "This is a sweet melody, I captivate you.",
        quizOptions: ["I captivate you / take you with me.", "You are my dear friend.", "He is singing beautifully.", "Sanskrit is sweet to hear."],
        correctAnswerIndex: 0
      },
      {
        id: "sa-13",
        foreignTerm: "गच्छामि पुनः मिलामः।",
        englishTranslation: "I am going, we will meet again.",
        pronunciation: "Gac-chā-mi pu-naḥ mi-lā-maḥ.",
        exampleSentenceForeign: "इदानीं गृहं गच्छामि पुनः मिलामः।",
        exampleSentenceEnglish: "Now I am going home, we will meet again.",
        quizOptions: ["Where are you going?", "Please stay here today.", "Sanskrit class is over.", "I am going, we will meet again."],
        correctAnswerIndex: 3
      },
      {
        id: "sa-14",
        foreignTerm: "एषः मम मित्रम् अस्ति।",
        englishTranslation: "This is my friend.",
        pronunciation: "E-ṣaḥ ma-ma mit-ram as-ti.",
        exampleSentenceForeign: "पश्यतु, एषः मम मित्रम् अस्ति।",
        exampleSentenceEnglish: "Look, this is my friend.",
        quizOptions: ["That is my classmate.", "This is my friend.", "We study together.", "He speaks fluent Sanskrit."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-15",
        foreignTerm: "किं कुर्वन् अस्ति भवान्?",
        englishTranslation: "What are you doing?",
        pronunciation: "Kiṃ kur-van as-ti bha-vān?",
        exampleSentenceForeign: "सखे, इदानीं किं कुर्वन् अस्ति भवान्?",
        exampleSentenceEnglish: "Friend, what are you doing right now?",
        quizOptions: ["Where are you going?", "Why are you reading?", "What are you doing?", "Can you help me?"],
        correctAnswerIndex: 2
      },
      {
        id: "sa-16",
        foreignTerm: "कुत्र गच्छति सः?",
        englishTranslation: "Where is he going?",
        pronunciation: "Kut-ra gac-cha-ti saḥ?",
        exampleSentenceForeign: "त्वरितगत्या कुत्र गच्छति सः?",
        exampleSentenceEnglish: "Where is he going so quickly?",
        quizOptions: ["Where is he going?", "What is he doing?", "When will he return?", "Where does he live?"],
        correctAnswerIndex: 0
      },
      {
        id: "sa-17",
        foreignTerm: "योगः कर्मसु कौशलम्।",
        englishTranslation: "Yoga is excellence in action.",
        pronunciation: "Yo-gaḥ kar-ma-su kau-śa-lam.",
        exampleSentenceForeign: "गीतायाः मुख्यं वचनम् - योगः कर्मसु कौशलम्।",
        exampleSentenceEnglish: "A main saying of Gita: Yoga is excellence in action.",
        quizOptions: ["Yoga makes body healthy.", "Yoga is excellence in action.", "Doing duty is real Yoga.", "We should practice meditation."],
        correctAnswerIndex: 1
      },
      {
        id: "sa-18",
        foreignTerm: "शीलं परं भूषणम्।",
        englishTranslation: "Good character is the highest ornament.",
        pronunciation: "Śī-laṃ pa-raṃ bhū-ṣa-nam.",
        exampleSentenceForeign: "धनं नश्यति चेत् न किमपि नश्यति, शीलं परं भूषणम्।",
        exampleSentenceEnglish: "If wealth is lost, nothing is lost; good character is the highest ornament.",
        quizOptions: ["Ornaments make one look rich.", "Character is lost, everything is lost.", "One should wear clean clothes.", "Good character is the highest ornament."],
        correctAnswerIndex: 3
      },
      {
        id: "sa-19",
        foreignTerm: "अहिंसा परमो धर्मः।",
        englishTranslation: "Non-violence is the highest duty.",
        pronunciation: "A-hiṃ-sā pa-ra-mo dhar-maḥ.",
        exampleSentenceForeign: "महाभारतस्य मुख्यः उपदेशः: अहिंसा परमो धर्मः।",
        exampleSentenceEnglish: "The main instruction of Mahabharata is: Non-violence is the highest duty.",
        quizOptions: ["Non-violence is the highest duty.", "Truth and non-violence are keys.", "We should love all animals.", "Do not hurt anyone's feelings."],
        correctAnswerIndex: 0
      },
      {
        id: "sa-20",
        foreignTerm: "शरीरमाद्यं खलु धर्मसाधनम्।",
        englishTranslation: "The body is indeed the primary instrument of duty.",
        pronunciation: "Śa-rī-ram-ād-yaṃ kha-lu dhar-ma-sā-dha-nam.",
        exampleSentenceForeign: "आरोग्यं रक्षन्तु, यतः शरीरमाद्यं खलु धर्मसाधनम्।",
        exampleSentenceEnglish: "Protect your health, because the body is indeed the primary instrument of duty.",
        quizOptions: ["Health is the real wealth.", "The body is indeed the primary instrument of duty.", "Exercise daily for good fitness.", "The soul never dies."],
        correctAnswerIndex: 1
      }
    ]
  }
];
