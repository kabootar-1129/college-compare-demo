import React, { useState, useEffect, useMemo } from 'react';

// --- MOCK DATA (Initial State) ---
const initialCollegesData = [
  { id: 1, name: 'Graphic Era Hill University', location: 'Dehradun', rating: 4.5, courses: ['B.Tech CSE', 'B.Tech ME', 'BBA'], image: 'https://placehold.co/600x400/0056b3/FFFFFF?text=GEHU', description: 'A leading institution in Uttarakhand known for its strong engineering and management programs.', reviews: [{author: 'Alumni', text: 'Great faculty and placement support.'}, {author: 'Student', text: 'The campus life is vibrant and engaging.'}] },
  { id: 2, name: 'IIT Bombay', location: 'Mumbai', rating: 4.9, courses: ['B.Tech CSE', 'Aerospace Engg.', 'Chemical Engg.'], image: 'https://placehold.co/600x400/d9534f/FFFFFF?text=IIT+Bombay', description: 'One of the premier engineering institutes in India, renowned for its research and innovation.', reviews: [{author: 'Professor', text: 'Cutting-edge research facilities.'}, {author: 'Student', text: 'A challenging but rewarding curriculum.'}] },
  { id: 3, name: 'Delhi Technological University', location: 'Delhi', rating: 4.7, courses: ['B.Tech ECE', 'Software Engg.', 'Mathematics'], image: 'https://placehold.co/600x400/5cb85c/FFFFFF?text=DTU', description: 'A top-ranked university in the heart of India, with a rich history of academic excellence.', reviews: [{author: 'Alumni', text: 'Strong industry connections.'}] },
  { id: 4, name: 'VIT Vellore', location: 'Vellore', rating: 4.6, courses: ['B.Tech IT', 'Biotechnology', 'Mechanical Engg.'], image: 'https://placehold.co/600x400/f0ad4e/FFFFFF?text=VIT', description: 'Famous for its flexible credit system and diverse student population from across the globe.', reviews: [{author: 'Student', text: 'So many clubs and technical chapters to join!'}] },
  { id: 5, name: 'NIT Trichy', location: 'Tiruchirappalli', rating: 4.8, courses: ['B.Tech Civil', 'Metallurgy', 'Architecture'], image: 'https://placehold.co/600x400/5bc0de/FFFFFF?text=NIT+Trichy', description: 'A leading National Institute of Technology with a sprawling campus and excellent infrastructure.', reviews: [{author: 'Alumni', text: 'Placements are top-notch, especially for core branches.'}] },
  { id: 6, name: 'BITS Pilani', location: 'Pilani', rating: 4.8, courses: ['B.E. CSE', 'M.Sc. Economics', 'Pharmacy'], image: 'https://placehold.co/600x400/337ab7/FFFFFF?text=BITS+Pilani', description: 'A private university known for its no-attendance policy and rigorous entrance examination, BITSAT.', reviews: [{author: 'Student', text: 'The academic freedom is unparalleled.'}] },
];

// --- College Details Modal Component ---
const CollegeModal = ({ college, onClose, onAddReview }) => {
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            onAddReview(college.id, reviewText);
            setReviewText('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{college.name}</h2>
                        <p className="text-gray-600">{college.location}</p>
                    </div>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <img src={college.image} alt={college.name} className="w-full h-64 object-cover rounded-md mb-4" />
                <p className="text-gray-700 mb-6">{college.description}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Reviews</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto mb-4 pr-2">
                    {college.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-gray-800">"{review.text}"</p>
                            <p className="text-right text-sm text-gray-600 font-semibold">- {review.author}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Add Your Review</h4>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Write your review here..."
                        rows="3"
                    ></textarea>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Review</button>
                </form>
            </div>
        </div>
    );
};


// --- Reusable College Card Component ---
const CollegeCard = ({ college, onBookmark, isBookmarked, onCompare, isCompared, onCardClick }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col">
    <div onClick={() => onCardClick(college)} className="cursor-pointer">
      <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h3>
        <p className="text-gray-600 mb-4">{college.location}</p>
        <span className="text-yellow-500 font-bold text-lg">⭐ {college.rating} / 5.0</span>
      </div>
    </div>
    <div className="p-6 pt-0 mt-auto flex justify-between items-center">
      <button
        onClick={() => onBookmark(college.id)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isBookmarked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        {isBookmarked ? '❤️ Bookmarked' : '🤍 Bookmark'}
      </button>
      <button
        onClick={() => onCompare(college.id)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isCompared ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        {isCompared ? '✅ Comparing' : '📊 Compare'}
      </button>
    </div>
  </div>
);

// --- Main App Component ---
export default function App() {
  const [colleges, setColleges] = useState(initialCollegesData);
  const [activePage, setActivePage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarked, setBookmarked] = useState(() => JSON.parse(localStorage.getItem('bookmarkedColleges')) || []);
  const [compared, setCompared] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [sortType, setSortType] = useState('name-asc');
  const [locationFilter, setLocationFilter] = useState('all');

  const uniqueLocations = useMemo(() => ['all', ...new Set(colleges.map(c => c.location))], [colleges]);

  const filteredAndSortedColleges = useMemo(() => {
    return colleges
      .filter(college =>
        (college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         college.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (locationFilter === 'all' || college.location === locationFilter)
      )
      .sort((a, b) => {
        switch (sortType) {
          case 'name-asc': return a.name.localeCompare(b.name);
          case 'name-desc': return b.name.localeCompare(a.name);
          case 'rating-asc': return a.rating - b.rating;
          case 'rating-desc': return b.rating - b.rating;
          default: return 0;
        }
      });
  }, [searchTerm, sortType, locationFilter, colleges]);

  useEffect(() => {
    localStorage.setItem('bookmarkedColleges', JSON.stringify(bookmarked));
  }, [bookmarked]);

  const handleBookmark = (collegeId) => {
    setBookmarked(prev => prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]);
  };

  const handleCompare = (collegeId) => {
    setCompared(prev => {
      if (prev.includes(collegeId)) {
        return prev.filter(id => id !== collegeId);
      }
      return prev.length < 2 ? [...prev, collegeId] : prev;
    });
  };

  const handleAddReview = (collegeId, reviewText) => {
    const newReview = { author: 'User', text: reviewText };
    setColleges(currentColleges =>
      currentColleges.map(college =>
        college.id === collegeId ? { ...college, reviews: [...college.reviews, newReview] } : college
      )
    );
    // Also update the selected college modal to show the new review instantly
    setSelectedCollege(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
  };

  const bookmarkedColleges = colleges.filter(college => bookmarked.includes(college.id));
  const comparedColleges = colleges.filter(college => compared.includes(college.id));

  const renderContent = () => {
    switch(activePage) {
      case 'compare':
        return (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">Comparison 📊</h2>
            {comparedColleges.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                {comparedColleges.map(college => (
                  <div key={college.id}>
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">{college.name}</h3>
                    <p><strong>Rating:</strong> <span className="text-yellow-500 font-bold">⭐ {college.rating}</span></p>
                    <p><strong>Location:</strong> {college.location}</p>
                    <p className="mt-2"><strong>Top Courses:</strong> {college.courses.join(', ')}</p>
                  </div>
                ))}
                {comparedColleges.length === 1 && <div className="flex items-center justify-center text-gray-500">Select another college to compare</div>}
              </div>
            ) : <p className="text-center text-gray-500 text-xl py-10">Select up to two colleges from the Home page to compare them.</p>}
          </div>
        );
      case 'bookmarks':
        return (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">My Bookmarks ❤️</h2>
            {bookmarkedColleges.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookmarkedColleges.map(college => (
                  <CollegeCard key={college.id} college={college} onBookmark={handleBookmark} isBookmarked={true} onCompare={handleCompare} isCompared={compared.includes(college.id)} onCardClick={setSelectedCollege} />
                ))}
              </div>
            ) : <p className="text-center text-gray-500 text-xl py-10">You haven't bookmarked any colleges yet.</p>}
          </div>
        );
      case 'home':
      default:
        return (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <input type="text" placeholder="Search by name or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-grow"><label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort by</label><select id="sort" value={sortType} onChange={e => setSortType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"><option value="name-asc">Name (A-Z)</option><option value="name-desc">Name (Z-A)</option><option value="rating-desc">Rating (High to Low)</option><option value="rating-asc">Rating (Low to High)</option></select></div>
                <div className="flex-grow"><label htmlFor="filter" className="block text-sm font-medium text-gray-700">Filter by Location</label><select id="filter" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">{uniqueLocations.map(loc => <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>)}</select></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">All Colleges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedColleges.map(college => (
                <CollegeCard key={college.id} college={college} onBookmark={handleBookmark} isBookmarked={bookmarked.includes(college.id)} onCompare={handleCompare} isCompared={compared.includes(college.id)} onCardClick={setSelectedCollege} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {selectedCollege && <CollegeModal college={selectedCollege} onClose={() => setSelectedCollege(null)} onAddReview={handleAddReview} />}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">CollegeCompare</h1>
          <nav className="flex space-x-2">
            <button onClick={() => setActivePage('home')} className={`px-4 py-2 rounded-md transition-colors duration-300 ${activePage === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>Home</button>
            <button onClick={() => setActivePage('bookmarks')} className={`px-4 py-2 rounded-md transition-colors duration-300 ${activePage === 'bookmarks' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>Bookmarks</button>
            <button onClick={() => setActivePage('compare')} className={`px-4 py-2 rounded-md transition-colors duration-300 ${activePage === 'compare' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>Compare</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>

      <footer className="bg-white mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>A Frontend Demo by Rachit Rawat. <a href="https://kabootar-1129.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Back to Portfolio</a></p>
        </div>
      </footer>
    </div>
  );
}
