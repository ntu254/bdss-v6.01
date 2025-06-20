import React from 'react';
import Modal from '../common/Modal';
import InputField from '../common/InputField';
import Button from '../common/Button';

const BloodCompatibilityFormModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} title="Compatibility Rule">
    <div className="space-y-4">
      <InputField label="Blood Type" id="bloodType" />
      <InputField label="Compatible With" id="compatible" />
      <Button onClick={onClose}>Save</Button>
    </div>
  </Modal>
);

export default BloodCompatibilityFormModal;
