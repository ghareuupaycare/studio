import React from 'react';

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-primary rounded-[2rem] shadow-2xl p-2 h-16">
      <div className="flex justify-around items-center h-full">
        {/* Blank Tab Area 1 */}
        <div className="flex-1 h-full rounded-2xl" />
        {/* Blank Tab Area 2 */}
        <div className="flex-1 h-full rounded-2xl" />
        {/* Blank Tab Area 3 */}
        <div className="flex-1 h-full rounded-2xl" />
      </div>
    </nav>
  );
};
