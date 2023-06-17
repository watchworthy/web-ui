import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface TrailerProps {
  trailerId: string;
}

export const Trailer = ({trailerId}: TrailerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Watch Trailer
      </Button>
      <Modal title="Trailer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${trailerId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      </Modal>
    </>
  );
};
export default Trailer;


