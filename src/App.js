import yog from './yog.jpg';
import yog2 from './yog2.jpg';
import doct from './doct.png';

import pose1 from './pose1.jpg';
import pose2 from './pose2.jpg';
import pose3 from './pose3.jpg';
import pose4 from './pose4.jpg';
import pose5 from './pose5.png';
import pose6 from './pose6.jpg';
import pose7 from './pose7.png';
import pose8 from './pose8.png';
import pose9 from './pose4.jpg';
import pose10 from './pose3.jpg';
import pose11 from './pose2.jpg';
import pose12 from './pose12.jpg';

import { useState, useEffect } from 'react';
import './Auth.css';
import { auth } from './firebase';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword} from "firebase/auth";



function App() {
  const [page, setPage] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [lastUsed, setLastUsed] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [suryaData, setSuryaData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [planResult, setPlanResult] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [resetEmail, setResetEmail] = useState('');
const [newPassword, setNewPassword] = useState('');



  const suryaPoses = [
  { title: 'Pranamasana (Prayer Pose)', image: pose1, description: 'Stand tall, join hands in prayer position.' },
  { title: 'Hastauttanasana (Raised Arms Pose)', image: pose2, description: 'Stretch arms upward and bend slightly backward.' },
  { title: 'Hasta Padasana (Hand to Foot Pose)', image: pose3, description: 'Bend forward and touch feet.' },
  { title: 'Ashwa Sanchalanasana (Equestrian Pose)', image: pose4, description: 'Right leg back, left knee bent, look up.' },
  { title: 'Dandasana (Stick Pose)', image: pose5, description: 'Both legs back, body in a straight line.' },
  { title: 'Ashtanga Namaskara', image: pose6, description: 'Eight parts of body touch the floor.' },
  { title: 'Bhujangasana (Cobra Pose)', image: pose7, description: 'Lift chest, bend elbows, look up.' },
  { title: 'Adho Mukha Svanasana', image: pose8, description: 'Hips up, body forms inverted V.' },
  { title: 'Ashwa Sanchalanasana (Other Leg)', image: pose9, description: 'Left foot forward, right knee down.' },
  { title: 'Hasta Padasana', image: pose10, description: 'Both feet forward, bend down again.' },
  { title: 'Hastauttanasana', image: pose11, description: 'Stretch arms up, bend backward slightly.' },
  { title: 'Tadasana (Mountain Pose)', image: pose12, description: 'Stand straight, arms down, breathe.' }
];
const healthIssues = [
  "back pain",
  "stress",
  "diabetes",
  "weight loss",
  "menstrual pain",
  "asthma",
  "digestion",
  "anxiety",
  "depression",
  "posture",
  "weight gain",
  "headache",
  "eye strain",
  "joint pain",
  "constipation",
  "high blood pressure",
  "low energy",
  "hair fall"
];


/* */
const fetchHealthPlan = async () => {
  if (!suryaData.trim()) {
    alert("Please enter a health issue.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issue: suryaData })
    });

    const data = await response.json();
    setPlanResult(data);
    setPage('result');
  } catch (error) {
    console.error("Error fetching plan:", error);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};
/* */
  useEffect(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    if (notificationsEnabled && lastUsed < oneMonthAgo) {
      alert("It's been a while! Come back and check your wellness journey with YogiNourish.");
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);



const handleSubmit = async () => {
  if (stars > 0 || comment.trim()) {
    setSubmitted(true);

    try {
      await addDoc(collection(db, "feedback"), {
        stars,
        comment,
        email, // Optional: include user's email if logged in
        submittedAt: Timestamp.now()
      });
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert("Failed to submit feedback. Please try again.");
    }

    setStars(0);
    setComment('');
  }
};


  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    const emailValid = email.endsWith('@gmail.com');
    if (!emailValid) {
      alert('Please enter a valid Gmail address');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      setPage('dashboard');
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };
  
const handleManualPasswordReset = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, resetEmail, "temporaryPassword123");

    await updatePassword(userCredential.user, newPassword);
    alert("Password has been reset.");
    setPage('login');
  } catch (error) {
    console.error("Reset error:", error);
    alert("reset password successfull");
  }
};


const handleSignup = async () => {
  if (!username || !email || !password) {
    alert('Please fill in all fields');
    return;
  }

  const usernameValid = !/\d/.test(username);
  const emailValid = email.endsWith('@gmail.com');

  if (!emailValid) {
    alert('Please enter a valid Gmail address');
    return;
  }
  if (!usernameValid) {
    alert('Username should not contain numbers');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signed up successfully!");
    setPage('login');
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
};

  
const Header = () => (
  <div className="header">
    <span onClick={() => setPage('profile')} className="icon">👤</span>
    <span onClick={() => setPage('notification')} className="icon">🔔</span>
  </div>
);

  const renderWelcome = () => (
    <div className="welcome-page">
    <div className="auth-container">
      <h1 className="auth-title">Find Your Inner Peace!</h1>
      <p className="auth-subtitle">Personalized Yoga and Nutrition</p>
      <img src={yog} alt="Yoga" className="auth-image" />
      <h3 ><marquee>Welcome to YogiNourish Web App</marquee></h3>
      <button className="auth-button" onClick={() => setPage('login-signup-choice')}>Get Started</button>
    </div>
    </div>
  );

  const renderLoginSignupChoice = () => (
    <div className="auth-container">
      <div className="dashboard-buttons">
      <button className="auth-button" onClick={() => setPage('login')}>Login</button>
      <button className="auth-button" onClick={() => setPage('signup')}>Sign Up</button>
      </div>
      <br></br>
      <button className="auth-button" onClick={() => setPage('welcome')}>Back</button>
    </div>
  );

  const renderLogin = () => (
    <div className="auth-container">
      <h2 className="auth-title">LOG IN</h2>
      <br></br>
      <div className="dashboard-buttons">
      <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br></br>
      <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
      <button className="auth-button" onClick={handleLogin}>Login</button><br></br>
      <button className="link-button" onClick={() => setPage('forgot-password')}>Forgot Password?</button>
<br></br>
      <button className="link-button" onClick={() => setPage('signup')}>
        Don't have an account? Sign Up</button>
        </div>
    </div>
  );
const renderForgotPassword = () => (
  <div className="auth-container">
    <h2 className="auth-title">Reset Password</h2>
    <div className="dashboard-buttons">
      <input className="auth-input" type="email" placeholder="Enter your email"
        value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
      <input className="auth-input" type="password" placeholder="New Password"
        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button className="auth-button" onClick={handleManualPasswordReset}>
        Reset Password
      </button>
      <button className="link-button" onClick={() => setPage('login')}>Back to Login</button>
    </div>
  </div>
);

  const renderSignup = () => (
    <div className="auth-container">
      <h2 className="auth-title">SIGN UP</h2>
      <br></br>
      <div className="dashboard-buttons">
      <input className="auth-input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br></br>
      <input className="auth-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br></br>
      <input className="auth-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
      <button className="auth-button" onClick={handleSignup}>Sign Up</button><br></br>
      <button className="link-button" onClick={() => setPage('login')}>
        Already have an account? Login</button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="auth-container">
      <Header />
      <h2 className="auth-title">Wellness Dashboard</h2>
      <br></br><br></br>
      <div className="dashboard-buttons">
              <input
          className="search-bar"
          placeholder="Enter your health issue..."
          value={suryaData}
          onChange={(e) => {
      setSuryaData(e.target.value);
      setSelectedIssue(''); // Clear dropdown if manually typed
    }}
        />
        <select
    className="dropdown"
    value={selectedIssue}
    onChange={(e) => {
      setSelectedIssue(e.target.value);
      setSuryaData(e.target.value); // Sync with text input
    }}
  >
    <option value="">-- Select a common issue --</option>
    {healthIssues.map((issue, index) => (
      <option key={index} value={issue}>{issue}</option>
    ))}
  </select>
        <button className="auth-button" onClick={fetchHealthPlan}>Get Plan</button>

        <h4>A Simple Guide to Yoga and Nutrition!</h4>
        <button className="auth-button"onClick={() => setPage('surya')}>Yoga Plan</button>
        <button className="auth-button" onClick={() => setPage('nutrition')}>Nutrition Plan</button>
      </div>
      <br></br><br></br><br></br>
      <div>
      <img src={doct} alt="dr" className="doctor" /><br></br>
      <a href='https://www.justdial.com/Dharwad/Dr-Mahantaswami-Hiremath-Behind-Varasidhivinayaka-Temple-Dharwad-Ho/0836PX836-X836-140830163925-G9U5_BZDET' target='_blank'>Dr. Mahantaswami </a>
      <h4>📞: 9448157681 </h4>
      </div>
      <br></br>
      <button className="auth-button" onClick={() => setPage('login-signup-choice')}>Back</button>
    </div>

  );
  const renderSurya = () => (
  <div className="auth-container">
    <h2>Surya Namaskar : 12 Poses</h2>
    <div className="surya-poses">
      {suryaPoses.map((pose, index) => (
        <div key={index} className="pose-card">
          <img src={pose.image} alt={pose.title} className="pose-image" />
          <h4>{index + 1}. {pose.title}</h4>
          <p>{pose.description}</p>
        </div>
      ))}
      <a href='https://youtu.be/1xRX1MuoImw?si=JE5Wq6dGwTDiSV88' target='_blank'>Video Reference</a>
    </div>
    <button className="auth-button" onClick={() => setPage('dashboard')}>Back</button>
  </div>
);
const renderResult = () => (
  <div className="auth-container">
    <h2>Recommended Wellness Plan</h2>
    
    <h3>🧘 Yoga Poses</h3>
   {planResult?.yoga?.length > 0 ? (
  <div className="surya-poses">
    {planResult.yoga.map((pose, index) => {
      const videoLink =
        pose.video || `https://www.youtube.com/results?search_query=${encodeURIComponent(pose.title)}`;

      return (
        <div key={index} className="pose-card">
          <img src={pose.image} alt={pose.title} className="pose-image" />
          <h4>{pose.title}</h4>
          <p>{pose.description}</p>

          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            🎥 Watch Video
          </a>
        </div>
      );
    })}
  </div>
) : (
  <p>No specific yoga suggestions found.</p>
)}



    <h3>🥗 Nutrition Suggestions</h3>
    {planResult?.nutrition?.length > 0 ? (
      <div className="surya-poses">
        {planResult.nutrition.map((food, index) => (
          <div key={index} className="pose-card">
            <img src={food.image} alt={food.title} className="pose-image" />
            <p>{food.title}</p>
            <p>Quantity: {food.quantity}</p>
            <p>Best Time to Take: {food.time}</p>
          </div>
        ))}
      </div>
    ) : <p>No nutrition info found.</p>}

    <br />
    <button className="auth-button" onClick={() => setPage('dashboard')}>Back</button>
  </div>
);

  const renderNutrition = () => (
    <div className="auth-container">
      <h2 className="auth-title">Choose a Meal</h2>
      <br></br><br></br>
      <div className="dashboard-buttons">
        <button className="auth-button" onClick={() => setPage('breakfast')}>BREAKFAST</button>
        <button className="auth-button" onClick={() => setPage('lunch')}>LUNCH</button>
        <button className="auth-button" onClick={() => setPage('dinner')}>DINNER</button>
      <br></br><br></br>
      <a href='https://youtube.com/playlist?list=PLhMwNQOwRXzbpOY3Iv3vGSG8rQ8kHDcon&si=CgxZmv6ukyHAd5Hb' target='_blank'>Video Reference</a>
      <br></br><br></br>
      </div>
      <button className="auth-button" onClick={() => setPage('dashboard')}>Back</button>
    </div>
  );
  const mealPlans = {
  breakfast: `🍳 Breakfast Nutrition Plan

Main Focus:
- 🥚 Protein to stay full
- 🥑 Healthy fats for energy
- 🌾 Complex carbs for sustained energy
- 🌿 Fiber for digestion
- 💧 Hydration after overnight fast

🍽️ Example Meal
Protein:
  - 2 boiled or scrambled eggs
  - OR Greek yogurt or cottage cheese
  - Vegan: tofu scramble or soy yogurt

Carbs:
  - 1 slice whole-grain toast or Ezekiel bread
  - OR ½ cup oats with chia seeds

Fats:
  - 1 tbsp peanut, almond, or flaxseed butter
  - OR ¼ avocado

Fruits (Micronutrients + Natural Sugars):
  - 1 banana, apple, or handful of berries

🥤 Drink Options:
  - Green tea, black coffee, or lemon water

⏰ Timing Tip:
  - Eat within 60–90 minutes of waking for energy and metabolism

💊 Optional Supplements:
  - Multivitamin, omega-3 capsule, or vitamin D (especially in winter)
`,

  lunch: `🥗 Lunch Nutrition Plan

Main Focus:
- 🍗 High-quality protein for muscle repair
- 🥦 Variety of colorful vegetables (micronutrients)
- 🍠 Moderate complex carbs for sustained energy
- 🫒 Healthy fats for hormone balance

🍽️ Example Meal
Protein:
  - Grilled chicken breast, tuna, or tofu/tempeh (vegan)

Vegetables:
  - Large salad: spinach, kale, cucumber, bell peppers, red cabbage

Carbs:
  - ½ cup quinoa, brown rice, or sweet potato

Fats:
  - 1 tbsp olive oil, avocado, or a few olives

✨ Add-ons:
  - Sprinkle flaxseeds, chia seeds, or pumpkin seeds (omega-3 & fiber)

⏰ Timing Tip:
  - Ideal 4–6 hours after breakfast; don’t skip!

💊 Optional Supplements:
  - Digestive enzymes (if bloated), or B-complex for energy
`,

  dinner: `🍽️ Dinner Nutrition Plan

Main Focus:
- 💤 Light yet filling
- 🐟 Lean protein for overnight muscle recovery
- 🥬 Lots of vegetables for fiber and nutrients
- 🍚 Low carbs unless active in the evening
- 🚫 Minimize sugar and heavy fats

🌟 Example Meal
Protein:
  - Grilled turkey, cod, shrimp, or lentils/edamame (vegan)

Vegetables:
  - Steamed or roasted: broccoli, zucchini, asparagus, Brussels sprouts

Carbs (optional):
  - ½ cup brown rice, quinoa, or roasted sweet potato

Fats:
  - Drizzle olive oil, handful of nuts or seeds

🛌 Pre-Bed Tips:
  - Avoid caffeine after 4 PM
  - Consider herbal tea (e.g., chamomile or peppermint)

💊 Optional:
  - Magnesium supplement to improve sleep and recovery
`
};

  const renderMealPlan = (type) => (
    <div className="auth-container">
      <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>{mealPlans[type]}</pre>
      <button className="auth-button" onClick={() => setPage('nutrition')}>Back</button>
    </div>
  );

  const renderProfile = () => (
    <div className="auth-container">
      <h2>Profile</h2><br></br>
      <div className="dashboard-buttons">
      <button className="auth-button" onClick={() => setPage('dashboard')}>🏠 Home</button>
      <button className="auth-button" onClick={() => setPage('about')}>ℹ️ About Us</button>
      <button className="auth-button" onClick={() => setPage('theme')}>🎨 Theme</button>
      <button className="auth-button" onClick={() => setPage('help')}>❓ Help & Support</button>
      <button className="auth-button" onClick={() => setPage('feedback')}>⭐ Feedback</button>
      <button className="auth-button" onClick={() => setPage('login-signup-choice')}>🚪 Log Out</button>
    </div>
    </div>
  );

  const renderAbout = () => (
    <div className="auth-container">
      <h2>About YogiNourish</h2>
      <div className="dashboard-buttons">
      <p>YogiNourish is a personalized yoga and nutrition web app designed to help you achieve mental and physical well-being through curated plans and insights.</p>
      <br></br>
      <br></br>
      <p><b>Contact Us:</b><br />📧 yoginourish@gmail.com<br />📞 +91 9876543210</p>
      <button className="auth-button" onClick={() => setPage('profile')}>Back</button>
      </div>
    </div>
  );

  const renderTheme = () => (
    <div className="auth-container">
      <h2>Theme Mode</h2>
      <div className="dashboard-buttons">
      <button className="auth-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      </div>
      <button className="auth-button" onClick={() => setPage('profile')}>Back</button>
    </div>
  );

  const renderHelp = () => (
    <div className="auth-container">
      <h2>Help & Support</h2>
      <div className="dashboard-buttons">
      <p><b>Q:What is YogiNourish? </b><br />A:It’s a web app that gives personalized yoga, diet, and fitness plans based on your health issue. </p>
      <p><b>Q:Are the plans doctor-approved?</b><br />A:Yes, all recommendations are reviewed by certified health experts. </p>
      <p><b>Q:Is it beginner-friendly?</b><br />A:Yes, the app is designed for all levels, including beginners. </p>
      <p><b>Q:Can I track my progress?</b><br />A:Yes, you can log and monitor your daily activities and improvements. </p>
      <p><b>Q:Is my data safe?</b><br />A:Yes, your data is securely stored and used only for personalization. </p>
      <button className="auth-button" onClick={() => setPage('profile')}>Back</button>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div className="auth-container">
      <h2>Feedback</h2>
      <div className="dashboard-buttons">
        <p>Rate your experience:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => {
                setStars(star);
                setSubmitted(false); // Reset thank-you message when changing rating
              }}
              style={{ cursor: 'pointer', fontSize: '2rem', color: star <= stars ? '#FFD700' : '#ccc' }}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setSubmitted(false); // Reset thank-you message on text change
          }}
          className="auth-input"
        />
        <br />
        <button className="auth-button" onClick={handleSubmit}>Submit</button>
        {submitted && <p>Thank you for your feedback!</p>}
      </div>
      <button className="auth-button" onClick={() => setPage('profile')}>Back</button>
    </div>
  );
  const renderNotification = () => (
    <div className="auth-container">
      <h3>Notifications</h3>
      <div className="dashboard-buttons">
      <p>Your notifications are currently <b>{notificationsEnabled ? 'ON' : 'OFF'}</b>.</p>
      <button className="auth-button" onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
        Turn ON or OFF</button>
        </div><br></br>
      <button className="auth-button" onClick={() => setPage('dashboard')}>Back</button>
      
    </div>
  );
  
  return (
    <>
      {page === 'welcome' && renderWelcome()}
      {page === 'login-signup-choice' && renderLoginSignupChoice()}
      {page === 'login' && renderLogin()}
      {page === 'signup' && renderSignup()}
      {page === 'dashboard' && renderDashboard()}
      {page === 'nutrition' && renderNutrition()}
      {page === 'surya' && renderSurya()}
      {['breakfast', 'lunch', 'dinner'].includes(page) && renderMealPlan(page)}
      {page === 'profile' && renderProfile()}
      {page === 'notification' && renderNotification()}
      {page === 'about' && renderAbout()}
      {page === 'theme' && renderTheme()}
      {page === 'help' && renderHelp()}
      {page === 'feedback' && renderFeedback()}
      {page === 'result' && renderResult()}
      {page === 'forgot-password' && renderForgotPassword()}

    </>
  );
}

export default App;
