import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onReset: () => void;
  onSubmit?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  onReset,
  onSubmit
}) => {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <Button type="button" variant="outline" onClick={onReset}>
        Limpar
      </Button>
      <Button type={onSubmit ? "button" : "submit"} onClick={onSubmit}>
        Gerar Informações
      </Button>
    </div>
    
  );
};

export default FormActions;
