import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader, Bot, Shield } from 'lucide-react';
import { verifyDocument, verifyLawyerLicense } from '../../services/verificationService';
import { UserRole } from '../../types';

interface DocumentVerificationProps {
  role: UserRole;
  onVerificationComplete: (verified: boolean, data?: any) => void;
}

const DocumentVerification: React.FC<DocumentVerificationProps> = ({ role, onVerificationComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Файл слишком большой. Максимальный размер: 5MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleVerification = async () => {
    if (!file) return;

    setVerifying(true);
    setError('');
    
    try {
      const result = role === 'lawyer' 
        ? await verifyLawyerLicense(file)
        : await verifyDocument(file);

      if (result.valid) {
        setSuccess(true);
        onVerificationComplete(true, result.data);
      } else {
        setError('Документ не прошел проверку. Пожалуйста, убедитесь в корректности данных.');
        onVerificationComplete(false);
      }
    } catch (err) {
      setError('Произошла ошибка при проверке документа. Пожалуйста, попробуйте снова.');
      onVerificationComplete(false);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-верификация</h3>
          <p className="text-sm text-gray-400">
            Искусственный интеллект проверит подлинность документов и данных
          </p>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
          <Shield className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          {role === 'lawyer' 
            ? 'Загрузите адвокатское удостоверение'
            : 'Загрузите документ, удостоверяющий личность'}
        </h3>
        <p className="text-sm text-gray-400">
          Поддерживаемые форматы: PDF, JPG, PNG (до 5MB)
        </p>
      </div>

      <div className={`
        relative border-2 border-dashed rounded-lg p-8
        transition-all duration-300
        ${error ? 'border-red-500/50 bg-red-500/5' : 'border-gray-700 bg-gray-800/50'}
        ${success ? 'border-green-500/50 bg-green-500/5' : ''}
        ${!file && !error ? 'hover:border-blue-500/50 hover:bg-blue-500/5' : ''}
      `}>
        <div className="flex flex-col items-center space-y-4">
          {success ? (
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
              <CheckCircle className="w-16 h-16 text-green-500 relative z-10" />
            </div>
          ) : (
            <Upload className="w-16 h-16 text-gray-400" />
          )}
          
          <div className="text-center">
            {!file && (
              <label className="cursor-pointer group">
                <span className="text-blue-400 group-hover:text-blue-300">Выберите файл</span>
                <span className="text-gray-400"> или перетащите его сюда</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={verifying || success}
                />
              </label>
            )}
            
            {file && !success && (
              <div className="flex items-center gap-2 text-gray-300">
                <span>{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XCircle className="w-5 h-5 text-red-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="absolute inset-x-0 -bottom-12 flex items-center gap-2 justify-center text-red-400 text-sm animate-shake">
            <XCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {file && !success && (
        <button
          onClick={handleVerification}
          disabled={verifying}
          className={`
            w-full py-3 px-4 rounded-lg text-white font-medium
            transition-all duration-300 transform
            ${verifying
              ? 'bg-gray-700 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg'
            }
          `}
        >
          {verifying ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Проверяем...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Проверить документ
            </span>
          )}
        </button>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-400">Документ успешно проверен</span>
        </div>
      )}
    </div>
  );
};

export default DocumentVerification;