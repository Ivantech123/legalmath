import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, Loader, AlertCircle } from 'lucide-react';
import { analyzeCase } from '../../services/aiService';
import { useStore } from '../../store';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settings } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    if (!settings.geminiApiKey) {
      setError('Для использования AI анализа необходимо добавить API ключ в настройках');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeCase(query);
      setAnalysis(result);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Произошла ошибка при анализе');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">AI Ассистент</h3>
          </div>
          <div className="text-xs bg-purple-500 px-2 py-1 rounded">
            Beta
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-700 mb-2">Рекомендация:</h4>
                <p className="text-gray-700">{analysis.legalAdvice}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Похожие дела:</h4>
                <ul className="space-y-2">
                  {analysis.similarCases.map((caseRef: string, index: number) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {caseRef}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Рекомендуемые действия:</h4>
                <ul className="space-y-2">
                  {analysis.recommendedActions.map((action: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                        {index + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Оценка рисков:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`
                    w-3 h-3 rounded-full
                    ${analysis.riskAssessment.level === 'low' && 'bg-green-500'}
                    ${analysis.riskAssessment.level === 'medium' && 'bg-yellow-500'}
                    ${analysis.riskAssessment.level === 'high' && 'bg-red-500'}
                  `}></div>
                  <span className="text-sm text-gray-600 capitalize">
                    {analysis.riskAssessment.level} risk
                  </span>
                </div>
                <ul className="space-y-1">
                  {analysis.riskAssessment.factors.map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right text-sm text-gray-500">
                Confidence: {analysis.confidence}%
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Опишите ваш вопрос..."
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${loading || !query.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'}
              `}
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;