import React from 'react';
import Modal from '../common/Modal';
import InputField from '../common/InputField';
import Button from '../common/Button';

const BloodTypeFormModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} title="Blood Type">
    <div className="space-y-4">
      <InputField label="Blood Type" id="bloodType" />
      <Button onClick={onClose}>Save</Button>
    </div>
  </Modal>
);

export default BloodTypeFormModal;
