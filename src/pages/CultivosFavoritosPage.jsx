import React from 'react';
import CultivosFavoritos from '../components/Cultivos';

export default function CultivosFavoritosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <CultivosFavoritos expandedView={true} />
      </div>
    </div>
  );
}