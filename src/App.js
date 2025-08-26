import React, { useState, useEffect } from 'react';

// --- MOCK DATA ---
// In a real MERN stack app, this would come from your MongoDB database.
// For this static demo, we'll define it right here.
const collegesData = [
  { id: 1, name: 'Graphic Era Hill University', location: 'Dehradun, Uttarakhand', rating: 4.5, courses: ['B.Tech CSE', 'B.Tech ME', 'BBA'], image: 'https://placehold.co/600x400/0056b3/FFFFFF?text=GEHU' },
  { id: 2, name: 'IIT Bombay', location: 'Mumbai, Maharashtra', rating: 4.9, courses: ['B.Tech CSE', 'Aerospace Engg.', 'Chemical Engg.'], image: 'https://placehold.co/600x400/d9534f/FFFFFF?text=IIT+Bombay' },
  { id: 3, name: 'Delhi Technological University', location: 'New Delhi, Delhi', rating: 4.7, courses: ['B.Tech ECE', 'Software Engg.', 'Mathematics'], image: 'https://placehold.co/600x400/5cb85c/FFFFFF?text=DTU' },
  { id: 4, name: 'VIT Vellore', location: 'Vellore, Tamil Nadu', rating: 4.6, courses: ['B.Tech IT', 'Biotechnology', 'Mechanical Engg.'], image: 'https://placehold.co/600x400/f0ad4e/FFFFFF?text=VIT' },
  { id: 5, name: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu', rating: 4.8, courses: ['B.Tech Civil', 'Metallurgy', 'Architecture'], image: 'https://placehold.co/600x400/5bc0de/FFFFFF?text=NIT+Trichy' },
  { id: 6, name: 'BITS Pilani', location: 'Pilani, Rajasthan', rating: 4.8, courses: ['B.E. CSE', 'M.Sc. Economics', 'Pharmacy'], image: 'https://placehold.co/600x400/337ab7/FFFFFF?text=BITS+Pilani' },
];

// --- Reusable College Card Component ---
const CollegeCard = ({ college, onBookmark, isBookmarked }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
    <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h3>
      <p className="text-gray-600 mb-4">{college.location}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-yellow-500 font-bold text-lg">⭐ {college.rating} / 5.0</span>
        <button
          onClick={() => onBookmark(college.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            isBookmarked 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {isBookmarked ? '❤️ Remove' : '🤍 Bookmark'}
        </button>
      </div>
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Top Courses:</h4>
        <div className="flex flex-wrap gap-2">
          {college.courses.map(course => (
            <span key={course} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  const [bookmarked, setBookmarked] = useState(() => {
    // Load bookmarks from localStorage on initial render
    const savedBookmarks = localStorage.getItem('bookmarkedColleges');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Effect to filter colleges whenever searchTerm changes
  useEffect(() => {
    const results = collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(results);
  }, [searchTerm]);

  // Effect to save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedColleges', JSON.stringify(bookmarked));
  }, [bookmarked]);

  const handleBookmark = (collegeId) => {
    setBookmarked(prevBookmarked => {
      if (prevBookmarked.includes(collegeId)) {
        return prevBookmarked.filter(id => id !== collegeId);
      } else {
        return [...prevBookmarked, collegeId];
      }
    });
  };

  const bookmarkedColleges = collegesData.filter(college => bookmarked.includes(college.id));

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">CollegeCompare</h1>
          <p className="text-gray-600">Your College Search Companion</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Your Future College</h2>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bookmarked Colleges Section */}
        {bookmarkedColleges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">My Bookmarks ❤️</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedColleges.map(college => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  onBookmark={handleBookmark}
                  isBookmarked={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Colleges Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">Available Colleges</h2>
          {filteredColleges.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map(college => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarked.includes(college.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl py-10">No colleges found matching your search.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>A Frontend Demo by Rachit Rawat. <a href="https://kabootar-1129.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Back to Portfolio</a></p>
        </div>
      </footer>
    </div>
  );
}
