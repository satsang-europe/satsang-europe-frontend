import type { PreviousEvents } from "@/types";
import { formatDate } from "@/utils/utilityFunction";

const EventCard = ({ event }: { event: PreviousEvents }) => {
  return (
    <div
      key={event.id}
      className="flex flex-col md:flex-row bg-linear-to-br from-gray-700 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-300 hover:shadow-amber-500/2"
    >
      <div className="w-full h-auto">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full p-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-2">
              {event.title}
            </h2>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Date
            </span>
            <span className="text-white font-medium">
              {formatDate(event.date)}
            </span>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Location
            </span>
            <span className="text-white font-medium">{event.location}</span>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Description
            </span>
            <span className="text-gray-300 text-sm leading-relaxed">
              {event.description}
            </span>
          </div>
        </div>

        {/* Event Link Button */}
        {event.eventLink && (
          <div className="mt-4 flex justify-center">
            <a
              href={event.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Event Details →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
