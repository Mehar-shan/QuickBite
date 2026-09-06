import React from 'react';
import { X, MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationsModal: React.FC<LocationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const branches = [
    {
      id: 1,
      name: 'QuickBite Flagship Downtown',
      address: '123 Food Street, New York, NY 10001',
      phone: '(212) 555-7890',
      hours: 'Mon - Sun: 10:00 AM - 11:00 PM',
      isCurrent: true,
      features: ['Dine-In', 'Drive-Thru', 'Delivery', 'Free WiFi'],
    },
    {
      id: 2,
      name: 'QuickBite Midtown Express',
      address: '450 Lexington Ave, New York, NY 10017',
      phone: '(212) 555-4321',
      hours: 'Mon - Sat: 08:00 AM - 10:00 PM',
      isCurrent: false,
      features: ['Takeaway', 'Delivery', 'Quick Kiosk'],
    },
    {
      id: 3,
      name: 'QuickBite Brooklyn Heights',
      address: '88 Montague St, Brooklyn, NY 11201',
      phone: '(718) 555-8899',
      hours: 'Mon - Sun: 11:00 AM - 11:30 PM',
      isCurrent: false,
      features: ['Dine-In', 'Patio Seating', 'Delivery'],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#141418] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black uppercase text-white font-display">
              QuickBite Restaurant Locations
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        <div className="space-y-4">
          {branches.map(branch => (
            <div
              key={branch.id}
              className={`p-5 rounded-2xl border text-left transition-all ${
                branch.isCurrent ? 'bg-amber-500/10 border-amber-500/50' : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>{branch.name}</span>
                    {branch.isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold uppercase">
                        Current Store
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-300 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{branch.address}</span>
                  </p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-400 pt-3 border-t border-white/5 mt-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{branch.hours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{branch.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3">
                {branch.features.map(f => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-md bg-black/40 text-neutral-300 border border-white/5">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
