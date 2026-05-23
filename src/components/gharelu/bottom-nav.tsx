import React from 'react';

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-primary shadow-2xl h-32">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-full">
        {/* Blank Tab Area 1 */}
        <div className="flex-1 h-full" />
        {/* Blank Tab Area 2 */}
        <div className="flex-1 h-full" />
        {/* Blank Tab Area 3 */}
        <div className="flex-1 h-full" />
      </div>
    </nav>
  );
};
