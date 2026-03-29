import React from 'react'
export function RecentlySoldTicker() {
  const soldItems = [
    {
      name: 'Boba Fett Prototype',
      price: '$14,500',
    },
    {
      name: 'Sealed Optimus Prime G1',
      price: '$8,200',
    },
    {
      name: 'Yak Face POTF',
      price: '$3,800',
    },
    {
      name: 'Fortress Maximus',
      price: '$5,100',
    },
    {
      name: 'Vinyl Cape Jawa',
      price: '$6,500',
    },
    {
      name: 'Megatron G1',
      price: '$2,900',
    },
    {
      name: 'Eternia Playset',
      price: '$9,500',
    },
    {
      name: 'Blue Snaggletooth',
      price: '$1,200',
    },
    {
      name: 'USS Flagg',
      price: '$4,800',
    },
    {
      name: 'Soundwave Tape Deck',
      price: '$1,500',
    },
  ]
  return (
    <div className="bg-gold-600 py-3 overflow-hidden border-y border-gold-400/20 relative z-30">
      <div className="flex animate-scroll-ticker w-max hover:[animation-play-state:paused]">
        {/* First set of items */}
        <div className="flex space-x-12 px-6">
          {soldItems.map((item, index) => (
            <div
              key={`original-${index}`}
              className="flex items-center space-x-3 text-charcoal-950 whitespace-nowrap"
            >
              <span className="font-medium tracking-wide uppercase text-sm opacity-80">
                Recently Sold:
              </span>
              <span className="font-serif font-bold">{item.name}</span>
              <span className="w-1 h-1 bg-charcoal-950 rounded-full opacity-50"></span>
              <span className="font-bold">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex space-x-12 px-6">
          {soldItems.map((item, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex items-center space-x-3 text-charcoal-950 whitespace-nowrap"
            >
              <span className="font-medium tracking-wide uppercase text-sm opacity-80">
                Recently Sold:
              </span>
              <span className="font-serif font-bold">{item.name}</span>
              <span className="w-1 h-1 bg-charcoal-950 rounded-full opacity-50"></span>
              <span className="font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
