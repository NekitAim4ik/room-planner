// components/AIAssistant.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

// База ответов: ключ — фрагмент вопроса, значение — ответ
const knowledgeBase: [string, string][] = [
  ['расстояние от дивана до телевизора', 'Расстояние от дивана до телевизора должно составлять 2-3 метра.'],
  ['журнальный столик', 'Оптимальное расстояние между диваном и журнальным столиком — около 50 сантиметров.'],
  ['обеденный стол', 'Оставь не менее 90 сантиметров от стола до других предметов в зонах стульев и проходов.'],
  ['холодильник', 'Размещай холодильник, мойку и плиту в рабочем треугольнике со сторонами 1-3 метра.'],
  ['плита', 'Располагай плиту не дальше 1-3 метров от холодильника и мойки.'],
  ['мойка', 'Мойка должна находиться в рабочем треугольнике с плитой и холодильником (1-3 метра между ними).'],
  ['кровать', 'Оставь не менее 90 сантиметров от кровати с одной стороны для свободного доступа.'],
  ['шкаф', 'Перед шкафом или комодом оставь не менее 90 сантиметров, чтобы открывать дверцы.'],
  ['комод', 'Перед комодом или шкафом оставь не менее 90 сантиметров для открывания дверц.'],
  ['унитаз', 'Оставь перед унитазом не менее 60 см, а по бокам — не менее 35 см свободного пространства.'],
  ['душевая кабина', 'Между умывальником и душевой кабиной или ванной оставь не менее 60 см для прохода.'],
  ['ванна', 'Между умывальником и ванной/душевой кабиной оставь не менее 60 см для свободного прохода.'],
  ['умывальник', 'Оставь не менее 60 см между умывальником и ванной/душевой кабиной.'],
  ['компьютер', 'Размести экран компьютера на расстоянии 50-70 сантиметров от глаз.'],
  ['рабочее место', 'Ставь стол ближе к окну для увеличения освещённости рабочего места.'],
];

const fallbackAnswer = 'Я отвечаю только на вопросы о планировке и эргономике помещения.';

function findAnswer(question: string): string {
  const lowerQuestion = question.toLowerCase();
  for (const [key, answer] of knowledgeBase) {
    if (lowerQuestion.includes(key)) {
      return answer;
    }
  }
  return fallbackAnswer;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Привет! Я твой личный ассистент и помогу тебе спланировать помещение. Напиши, что тебе нужно, или нажми "Подсказка" — я предложу идеи сам.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Имитация задержки ответа
    setTimeout(() => {
      const answer = findAnswer(userMessage.text);
      const assistantMessage: Message = { role: 'assistant', text: answer };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Кнопка открытия чата */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Заголовок */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Ассистент по планировке</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 p-3 h-64 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="border-t border-gray-200 p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Задайте вопрос..."
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}