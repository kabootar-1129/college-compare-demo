import React, { useState, useEffect, useMemo } from 'react';

// --- ICONS (as reusable components) ---
const BookmarkIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
  </svg>
);
const CompareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m-6 0H9m0 0h.01M17 19v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

// --- CATEGORY ICONS ---
const TechIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const UniversityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const PrivateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);

const categoryIcons = {
    Tech: <TechIcon />,
    University: <UniversityIcon />,
    Private: <PrivateIcon />,
};
const categoryColors = {
    Tech: 'border-cyan-400',
    University: 'border-amber-400',
    Private: 'border-violet-400',
}

// --- EXPANDED MOCK DATA with CATEGORIES ---
const initialCollegesData = [
    { id: 1, name: 'Graphic Era Hill University', location: 'Dehradun', state: 'Uttarakhand', rating: 4.5, fees: 150000, courses: ['B.Tech CSE', 'B.Tech ME', 'BBA'], category: 'University', description: 'A leading institution in Uttarakhand known for its strong engineering and management programs.', reviews: [{author: 'Alumni', text: 'Great faculty and placement support.'}, {author: 'Student', text: 'The campus life is vibrant and engaging.'}] },
    { id: 2, name: 'IIT Bombay', location: 'Mumbai', state: 'Maharashtra', rating: 4.9, fees: 220000, courses: ['B.Tech CSE', 'Aerospace Engg.', 'Chemical Engg.'], category: 'Tech', description: 'One of the premier engineering institutes in India, renowned for its research and innovation.', reviews: [{author: 'Professor', text: 'Cutting-edge research facilities.'}, {author: 'Student', text: 'A challenging but rewarding curriculum.'}] },
    { id: 3, name: 'Delhi Technological University', location: 'Delhi', state: 'Delhi', rating: 4.7, fees: 210000, courses: ['B.Tech ECE', 'Software Engg.', 'Mathematics'], category: 'Tech', description: 'A top-ranked university in the heart of India, with a rich history of academic excellence.', reviews: [{author: 'Alumni', text: 'Strong industry connections.'}] },
    { id: 4, name: 'VIT Vellore', location: 'Vellore', state: 'Tamil Nadu', rating: 4.6, fees: 198000, courses: ['B.Tech IT', 'Biotechnology', 'Mechanical Engg.'], category: 'Private', description: 'Famous for its flexible credit system and diverse student population from across the globe.', reviews: [{author: 'Student', text: 'So many clubs and technical chapters to join!'}] },
    { id: 5, name: 'NIT Trichy', location: 'Tiruchirappalli', state: 'Tamil Nadu', rating: 4.8, fees: 180000, courses: ['B.Tech Civil', 'Metallurgy', 'Architecture'], category: 'Tech', description: 'A leading National Institute of Technology with a sprawling campus and excellent infrastructure.', reviews: [{author: 'Alumni', text: 'Placements are top-notch, especially for core branches.'}] },
    { id: 6, name: 'BITS Pilani', location: 'Pilani', state: 'Rajasthan', rating: 4.8, fees: 420000, courses: ['B.E. CSE', 'M.Sc. Economics', 'Pharmacy'], category: 'Private', description: 'A private university known for its no-attendance policy and rigorous entrance examination, BITSAT.', reviews: [{author: 'Student', text: 'The academic freedom is unparalleled.'}] },
    { id: 7, name: 'IIT Madras', location: 'Chennai', state: 'Tamil Nadu', rating: 4.9, fees: 215000, courses: ['Naval Architecture', 'Engineering Physics'], category: 'Tech', description: 'Known for its lush green campus and strong focus on research and development.', reviews: [{author: 'Researcher', text: 'Incredible labs and research opportunities.'}] },
    { id: 8, name: 'Jadavpur University', location: 'Kolkata', state: 'West Bengal', rating: 4.6, fees: 10000, courses: ['Information Technology', 'Power Engineering'], category: 'University', description: 'A top-tier public university offering high-quality education at a very low cost.', reviews: [{author: 'Alumni', text: 'Best ROI in the country.'}] },
    { id: 9, name: 'Thapar Institute of Engineering', location: 'Patiala', state: 'Punjab', rating: 4.4, fees: 325000, courses: ['Biomedical Engineering', 'Mechatronics'], category: 'Private', description: 'A leading private engineering institution with a strong emphasis on practical learning.', reviews: [{author: 'Student', text: 'Great infrastructure and modern labs.'}] },
    { id: 10, name: 'Manipal Institute of Technology', location: 'Manipal', state: 'Karnataka', rating: 4.5, fees: 335000, courses: ['Computer & Communication', 'Data Science'], category: 'Private', description: 'A constituent institution of Manipal Academy of Higher Education, known for its international collaborations.', reviews: [{author: 'Student', text: 'Amazing campus life and cultural fests.'}] },
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transform transition-all animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white">{college.name}</h2>
                        <p className="text-gray-400 font-medium">{college.location}</p>
                    </div>
                    <button onClick={onClose} className="text-3xl font-light text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="w-full h-64 flex items-center justify-center rounded-lg mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #1f2937, #374151)' }}>
                    {categoryIcons[college.category] || <UniversityIcon />}
                </div>
                <p className="text-gray-300 mb-6 text-lg">{college.description}</p>
                <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Reviews</h3>
                <div className="space-y-4 max-h-40 overflow-y-auto mb-6 pr-2">
                    {college.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
                            <p className="text-gray-200 italic">"{review.text}"</p>
                            <p className="text-right text-sm text-gray-400 font-semibold mt-2">- {review.author}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <h4 className="text-xl font-semibold text-white mb-2">Add Your Review</h4>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Share your experience..." rows="3"></textarea>
                    <button type="submit" className="mt-3 w-full px-4 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

// --- Reusable College Card Component ---
const CollegeCard = ({ college, onBookmark, isBookmarked, onCompare, isCompared, onCardClick }) => (
  <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 flex flex-col border border-gray-700 hover:border-4 ${categoryColors[college.category] || 'border-gray-700'}`}>
    <div onClick={() => onCardClick(college)} className="cursor-pointer p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-full mr-4">
            {categoryIcons[college.category] || <UniversityIcon />}
        </div>
        <div>
            <h3 className="text-xl font-bold text-white truncate">{college.name}</h3>
            <p className="text-gray-400 text-sm">{college.location}, {college.state}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm">
          <span className="text-yellow-400 font-bold bg-gray-700/50 px-3 py-1 rounded-full">⭐ {college.rating}</span>
          <span className="text-indigo-400 font-semibold bg-gray-700/50 px-3 py-1 rounded-full">₹{college.fees.toLocaleString()}/yr</span>
      </div>
    </div>
    <div className="p-4 pt-0 mt-auto flex justify-between items-center gap-2">
      <button onClick={() => onBookmark(college.id)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${isBookmarked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
        <BookmarkIcon filled={isBookmarked} /> <span className="ml-1">{isBookmarked ? 'Saved' : 'Save'}</span>
      </button>
      <button onClick={() => onCompare(college.id)} className={`w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${isCompared ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
        <CompareIcon /> <span className="ml-1">{isCompared ? 'Selected' : 'Compare'}</span>
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
  
  // Filter States
  const [maxFees, setMaxFees] = useState(500000);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const uniqueStates = useMemo(() => ['all', ...new Set(colleges.map(c => c.state))], [colleges]);
  const uniqueCourses = useMemo(() => ['all', ...new Set(colleges.flatMap(c => c.courses))], [colleges]);

  const filteredColleges = useMemo(() => {
    return colleges
      .filter(college =>
        (college.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedState === 'all' || college.state === selectedState) &&
        (selectedCourse === 'all' || college.courses.includes(selectedCourse)) &&
        (college.fees <= maxFees)
      );
  }, [searchTerm, selectedState, selectedCourse, maxFees, colleges]);

  const handleAddReview = (collegeId, reviewText) => {
    const newReview = { author: 'User', text: reviewText };
    setColleges(currentColleges =>
      currentColleges.map(college =>
        college.id === collegeId ? { ...college, reviews: [...college.reviews, newReview] } : college
      )
    );
    setSelectedCollege(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
  };
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
  useEffect(() => {
    localStorage.setItem('bookmarkedColleges', JSON.stringify(bookmarked));
  }, [bookmarked]);


  const bookmarkedColleges = colleges.filter(college => bookmarked.includes(college.id));
  const comparedColleges = colleges.filter(college => compared.includes(college.id));

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white flex">
      {selectedCollege && <CollegeModal college={selectedCollege} onClose={() => setSelectedCollege(null)} onAddReview={handleAddReview} />}
      
      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-6 flex-shrink-0 flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-2">College<span className="text-indigo-400">Compare</span></h1>
        <p className="text-gray-400 text-sm mb-8">Your College Search Companion</p>

        <nav className="flex flex-col space-y-2 mb-8">
          <button onClick={() => setActivePage('home')} className={`text-left text-lg p-3 rounded-md transition-colors ${activePage === 'home' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Home</button>
          <button onClick={() => setActivePage('bookmarks')} className={`text-left text-lg p-3 rounded-md transition-colors ${activePage === 'bookmarks' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Bookmarks</button>
          <button onClick={() => setActivePage('compare')} className={`text-left text-lg p-3 rounded-md transition-colors ${activePage === 'compare' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Compare</button>
        </nav>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-700 pb-2">Filters</h2>
          {/* State Filter */}
          <div>
            <label htmlFor="state-filter" className="block text-sm font-medium text-gray-400 mb-1">State</label>
            <select id="state-filter" value={selectedState} onChange={e => setSelectedState(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white">
              {uniqueStates.map(state => <option key={state} value={state}>{state === 'all' ? 'All States' : state}</option>)}
            </select>
          </div>
          {/* Course Filter */}
          <div>
            <label htmlFor="course-filter" className="block text-sm font-medium text-gray-400 mb-1">Course</label>
            <select id="course-filter" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white">
              {uniqueCourses.map(course => <option key={course} value={course}>{course === 'all' ? 'All Courses' : course}</option>)}
            </select>
          </div>
          {/* Fees Filter */}
          <div>
            <label htmlFor="fees-filter" className="block text-sm font-medium text-gray-400 mb-1">Max Annual Fees: ₹{maxFees.toLocaleString()}</label>
            <input type="range" id="fees-filter" min="10000" max="500000" step="10000" value={maxFees} onChange={e => setMaxFees(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
        <footer className="mt-auto text-center text-gray-500 text-xs">
          <p>Demo by Rachit Rawat</p>
          <a href="https://kabootar-1129.github.io/" target="_blank" rel="noopener noreferrer" className="hover:underline">Back to Portfolio</a>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <input type="text" placeholder="Search by college name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg mb-8" />
        
        {(() => {
          switch(activePage) {
            case 'compare':
              return (
                <div className="animate-fade-in">
                  <h2 className="text-4xl font-bold text-white mb-6">Comparison</h2>
                  {comparedColleges.length > 0 ? (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                      {comparedColleges.map(college => (
                        <div key={college.id}>
                          <h3 className="text-2xl font-bold text-indigo-400 mb-3">{college.name}</h3>
                          <p><strong>Rating:</strong> <span className="text-yellow-400 font-bold">⭐ {college.rating}</span></p>
                          <p><strong>Location:</strong> {college.location}, {college.state}</p>
                          <p><strong>Fees:</strong> ₹{college.fees.toLocaleString()}/yr</p>
                          <p className="mt-2"><strong>Top Courses:</strong> {college.courses.join(', ')}</p>
                        </div>
                      ))}
                      {comparedColleges.length === 1 && <div className="flex items-center justify-center text-gray-500 text-lg">Select another college to compare.</div>}
                    </div>
                  ) : <div className="text-center text-gray-500 text-xl py-16 bg-gray-800 rounded-xl shadow-md">Select up to two colleges from the Home page to compare them.</div>}
                </div>
              );
            case 'bookmarks':
              return (
                <div className="animate-fade-in">
                  <h2 className="text-4xl font-bold text-white mb-6">My Bookmarks</h2>
                  {bookmarkedColleges.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {bookmarkedColleges.map(college => (
                        <CollegeCard key={college.id} college={college} onBookmark={handleBookmark} isBookmarked={true} onCompare={handleCompare} isCompared={compared.includes(college.id)} onCardClick={setSelectedCollege} />
                      ))}
                    </div>
                  ) : <div className="text-center text-gray-500 text-xl py-16 bg-gray-800 rounded-xl shadow-md">You haven't bookmarked any colleges yet.</div>}
                </div>
              );
            case 'home':
            default:
              return (
                <div className="animate-fade-in">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredColleges.map(college => (
                      <CollegeCard key={college.id} college={college} onBookmark={handleBookmark} isBookmarked={bookmarked.includes(college.id)} onCompare={handleCompare} isCompared={compared.includes(college.id)} onCardClick={setSelectedCollege} />
                    ))}
                  </div>
                  {filteredColleges.length === 0 && <div className="text-center text-gray-500 text-xl py-16 bg-gray-800 rounded-xl shadow-md col-span-full">No colleges match your current filters. Try adjusting your search.</div>}
                </div>
              );
          }
        })()}
      </main>
    </div>
  );
}
