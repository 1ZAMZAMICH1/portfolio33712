import React from 'react';

export default function CrtTv() {
  return (
    <iframe
      src="/telek/index.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
        zIndex: 9999
      }}
      title="CRT Television"
    />
  );
}
