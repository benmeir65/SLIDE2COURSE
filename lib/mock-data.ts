export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  createdAt: string
  studentCount: number
  questionCount: number
  unitCount: number
  shareLink: string
  status: "published" | "draft"
}

export interface Student {
  id: string
  name: string
  email: string
  avatar: string
  className: string
  progress: number
  averageGrade: number
  lastActive: string
}

export interface ClassRoom {
  id: string
  name: string
  studentCount: number
  courseCount: number
  teacherName: string
  color: string
}

export interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  date: string
  read: boolean
  attachment?: string
}

export interface Submission {
  id: string
  studentName: string
  courseName: string
  submittedAt: string
  grade: number | null
  status: "checked" | "unchecked" | "ai-checked"
  aiRecommendedGrade?: number
}

export interface Task {
  id: string
  title: string
  courseName: string
  className: string
  dueDate: string
  submittedCount: number
  totalStudents: number
  lateCount: number
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "מבוא לביולוגיה - תא החיים",
    description: "קורס מקיף על מבנה התא, תפקידי האברונים ותהליכים תאיים בסיסיים",
    thumbnail: "/placeholder-bio.jpg",
    createdAt: "2026-01-15",
    studentCount: 34,
    questionCount: 24,
    unitCount: 6,
    shareLink: "https://slidesup.learn/course/bio101",
    status: "published",
  },
  {
    id: "2",
    title: "היסטוריה - מלחמת העולם השנייה",
    description: "סקירה מקיפה של אירועי מלחמת העולם השנייה, סיבות, מהלך ותוצאות",
    thumbnail: "/placeholder-history.jpg",
    createdAt: "2026-01-20",
    studentCount: 28,
    questionCount: 18,
    unitCount: 8,
    shareLink: "https://slidesup.learn/course/hist201",
    status: "published",
  },
  {
    id: "3",
    title: "מתמטיקה - אלגברה לינארית",
    description: "יסודות האלגברה הלינארית: מטריצות, וקטורים, מרחבים לינאריים",
    thumbnail: "/placeholder-math.jpg",
    createdAt: "2026-02-01",
    studentCount: 42,
    questionCount: 30,
    unitCount: 10,
    shareLink: "https://slidesup.learn/course/math301",
    status: "published",
  },
  {
    id: "4",
    title: "אנגלית - Reading Comprehension",
    description: "פיתוח מיומנויות הבנת הנקרא באנגלית ברמה מתקדמת",
    thumbnail: "/placeholder-english.jpg",
    createdAt: "2026-02-05",
    studentCount: 19,
    questionCount: 15,
    unitCount: 5,
    shareLink: "https://slidesup.learn/course/eng101",
    status: "draft",
  },
  {
    id: "5",
    title: "פיזיקה - מכניקה קלאסית",
    description: "חוקי ניוטון, כוחות, אנרגיה ותנועה במכניקה הקלאסית",
    thumbnail: "/placeholder-physics.jpg",
    createdAt: "2026-02-08",
    studentCount: 25,
    questionCount: 22,
    unitCount: 7,
    shareLink: "https://slidesup.learn/course/phys101",
    status: "published",
  },
  {
    id: "6",
    title: "ספרות - שירה עברית מודרנית",
    description: "ניתוח יצירות שירה עברית מודרנית מביאליק ועד עמיחי",
    thumbnail: "/placeholder-literature.jpg",
    createdAt: "2026-02-10",
    studentCount: 15,
    questionCount: 12,
    unitCount: 4,
    shareLink: "https://slidesup.learn/course/lit201",
    status: "draft",
  },
]

export const mockStudents: Student[] = [
  { id: "1", name: "יעל כהן", email: "yael@school.il", avatar: "YK", className: "כיתה י1", progress: 85, averageGrade: 92, lastActive: "2026-02-13" },
  { id: "2", name: "אורי לוי", email: "ori@school.il", avatar: "AL", className: "כיתה י1", progress: 72, averageGrade: 78, lastActive: "2026-02-12" },
  { id: "3", name: "נעמה ברק", email: "naama@school.il", avatar: "NB", className: "כיתה י1", progress: 95, averageGrade: 97, lastActive: "2026-02-13" },
  { id: "4", name: "דניאל שמיר", email: "daniel@school.il", avatar: "DS", className: "כיתה י2", progress: 60, averageGrade: 71, lastActive: "2026-02-10" },
  { id: "5", name: "מיכל אברהם", email: "michal@school.il", avatar: "MA", className: "כיתה י2", progress: 88, averageGrade: 85, lastActive: "2026-02-13" },
  { id: "6", name: "תומר רוזן", email: "tomer@school.il", avatar: "TR", className: "כיתה י2", progress: 45, averageGrade: 62, lastActive: "2026-02-08" },
  { id: "7", name: "שירה גולן", email: "shira@school.il", avatar: "SG", className: "כיתה יא1", progress: 90, averageGrade: 94, lastActive: "2026-02-13" },
  { id: "8", name: "אדם פרידמן", email: "adam@school.il", avatar: "AF", className: "כיתה יא1", progress: 55, averageGrade: 68, lastActive: "2026-02-11" },
]

export const mockClasses: ClassRoom[] = [
  { id: "1", name: "כיתה י1", studentCount: 32, courseCount: 4, teacherName: "ד\"ר רחל מזרחי", color: "hsl(262, 83%, 58%)" },
  { id: "2", name: "כיתה י2", studentCount: 30, courseCount: 3, teacherName: "ד\"ר רחל מזרחי", color: "hsl(187, 92%, 41%)" },
  { id: "3", name: "כיתה יא1", studentCount: 28, courseCount: 5, teacherName: "ד\"ר רחל מזרחי", color: "hsl(38, 92%, 50%)" },
]

export const mockMessages: Message[] = [
  { id: "1", from: "ד\"ר רחל מזרחי", to: "כיתה י1", subject: "מטלה חדשה - תא החיים", content: "שלום לכולם, עליכם להשלים את היחידה השלישית עד יום חמישי. בהצלחה!", date: "2026-02-13", read: false },
  { id: "2", from: "ד\"ר רחל מזרחי", to: "כיתה י2", subject: "שינוי מועד הגשה", content: "מועד ההגשה של מטלת ההיסטוריה נדחה ליום ראשון הבא.", date: "2026-02-12", read: true },
  { id: "3", from: "יעל כהן", to: "ד\"ר רחל מזרחי", subject: "שאלה לגבי המטלה", content: "שלום המורה, האם ניתן להגיש את המטלה בפורמט PDF?", date: "2026-02-11", read: true },
]

export const mockSubmissions: Submission[] = [
  { id: "1", studentName: "יעל כהן", courseName: "מבוא לביולוגיה", submittedAt: "2026-02-13 09:30", grade: 92, status: "checked" },
  { id: "2", studentName: "אורי לוי", courseName: "מבוא לביולוגיה", submittedAt: "2026-02-13 10:15", grade: null, status: "ai-checked", aiRecommendedGrade: 78 },
  { id: "3", studentName: "נעמה ברק", courseName: "היסטוריה - מלה\"ע השנייה", submittedAt: "2026-02-12 14:00", grade: 97, status: "checked" },
  { id: "4", studentName: "דניאל שמיר", courseName: "מתמטיקה - אלגברה", submittedAt: "2026-02-12 16:45", grade: null, status: "unchecked" },
  { id: "5", studentName: "מיכל אברהם", courseName: "מבוא לביולוגיה", submittedAt: "2026-02-11 08:20", grade: 85, status: "checked" },
  { id: "6", studentName: "תומר רוזן", courseName: "היסטוריה - מלה\"ע השנייה", submittedAt: "2026-02-11 19:00", grade: null, status: "unchecked" },
  { id: "7", studentName: "שירה גולן", courseName: "אנגלית - Reading", submittedAt: "2026-02-10 11:30", grade: 94, status: "checked" },
  { id: "8", studentName: "אדם פרידמן", courseName: "פיזיקה - מכניקה", submittedAt: "2026-02-10 15:00", grade: null, status: "ai-checked", aiRecommendedGrade: 65 },
]

export const mockTasks: Task[] = [
  { id: "1", title: "יחידה 3 - מבנה התא", courseName: "מבוא לביולוגיה", className: "כיתה י1", dueDate: "2026-02-15", submittedCount: 28, totalStudents: 32, lateCount: 2 },
  { id: "2", title: "פרק 5 - חזית המזרח", courseName: "היסטוריה - מלה\"ע השנייה", className: "כיתה י2", dueDate: "2026-02-18", submittedCount: 15, totalStudents: 30, lateCount: 0 },
  { id: "3", title: "תרגול מטריצות", courseName: "מתמטיקה - אלגברה", className: "כיתה יא1", dueDate: "2026-02-20", submittedCount: 8, totalStudents: 28, lateCount: 1 },
  { id: "4", title: "Reading Passage 4", courseName: "אנגלית - Reading", className: "כיתה י1", dueDate: "2026-02-22", submittedCount: 5, totalStudents: 32, lateCount: 0 },
]

export const mockGradesByStudent = [
  { name: "יעל כהן", bio: 92, history: 88, math: 95, english: 90 },
  { name: "אורי לוי", bio: 78, history: 72, math: 80, english: 75 },
  { name: "נעמה ברק", bio: 97, history: 95, math: 98, english: 96 },
  { name: "דניאל שמיר", bio: 71, history: 68, math: 65, english: 74 },
  { name: "מיכל אברהם", bio: 85, history: 82, math: 88, english: 80 },
  { name: "תומר רוזן", bio: 62, history: 58, math: 60, english: 65 },
]

export const mockClassProgress = [
  { month: "ספט", average: 72 },
  { month: "אוק", average: 75 },
  { month: "נוב", average: 78 },
  { month: "דצמ", average: 80 },
  { month: "ינו", average: 83 },
  { month: "פבר", average: 85 },
]

export const mockCourseUnits = [
  { id: "1", title: "מבוא - מהו תא?", completed: true, slides: 8 },
  { id: "2", title: "מבנה קרום התא", completed: true, slides: 12 },
  { id: "3", title: "אברוני התא", completed: true, slides: 15 },
  { id: "4", title: "חלוקת תאים", completed: false, slides: 10 },
  { id: "5", title: "פוטוסינתזה", completed: false, slides: 14 },
  { id: "6", title: "נשימה תאית", completed: false, slides: 11 },
]

export const questionTypes = [
  {
    id: "single-choice",
    title: "בחירה יחידה",
    description: "שאלה עם תשובה נכונה אחת מתוך מספר אפשרויות",
    icon: "CircleDot",
  },
  {
    id: "multiple-choice",
    title: "בחירה מרובה",
    description: "שאלה עם מספר תשובות נכונות מתוך אפשרויות",
    icon: "CheckSquare",
  },
  {
    id: "drag-drop-single",
    title: "גרור ושחרר - ערך יחיד",
    description: "גרירת פריט אחד למיקום הנכון",
    icon: "Move",
  },
  {
    id: "drag-drop-multi",
    title: "גרור ושחרר - ערכים מרובים",
    description: "גרירת מספר פריטים למיקומים הנכונים",
    icon: "Layers",
  },
  {
    id: "sorting",
    title: "מיון וסידור",
    description: "סידור פריטים בסדר הנכון",
    icon: "ArrowUpDown",
  },
  {
    id: "open-question",
    title: "שאלה פתוחה",
    description: "תשובה חופשית עם בדיקת AI אוטומטית",
    icon: "MessageSquare",
  },
]

export const templateInstructions = [
  {
    id: "title-slide",
    title: "שקופית כותרת יחידה (שער)",
    description: "צרו שקופית חדשה, צבעו את כל הרקע בצהוב, וכתבו את שם היחידה. המערכת תזהה אותה כתחילת יחידה חדשה.",
    color: "#FFD966",
    template: `כותרת היחידה

(כל הרקע של השקופית צריך להיות צהוב)`,
  },
  {
    id: "single-choice",
    title: "שאלת בחירה יחידה",
    description: "כתבו את השאלה בכותרת השקופית, ואת התשובות ברשימה ממוספרת. סמנו כוכבית (*) בסוף התשובה הנכונה.\nרשמו למטה את הניקוד (אלא אם תבחרו בהגדרות הקורס שבינה מלאכותית תחשב את הניקוד אוטומטית לפי מספר השאלות).",
    color: "hsl(262, 83%, 58%)",
    template: `כותרת: טקסט השאלה

1. תשובה א
2. תשובה ב*
3. תשובה ג
4. תשובה ד

ניקוד: `,
  },
  {
    id: "multiple-choice",
    title: "שאלת בחירה מרובה",
    description: "אותו מבנה כמו בחירה יחידה, אבל סמנו כוכבית (*) ליד כל תשובה נכונה.\nרשמו למטה את הניקוד (אלא אם תבחרו בהגדרות הקורס שבינה מלאכותית תחשב את הניקוד אוטומטית לפי מספר השאלות).",
    color: "hsl(187, 92%, 41%)",
    template: `כותרת: טקסט השאלה

1. תשובה א*
2. תשובה ב
3. תשובה ג*
4. תשובה ד
5. תשובה ה*

ניקוד: `,
  },
  {
    id: "drag-drop",
    title: "שאלת גרור ושחרר",
    description: "צרו טבלה בשקופית עם שתי עמודות: פריט ויעד. המערכת תזהה את הטבלה ותייצר שאלת התאמה.\nרשמו למטה את הניקוד (אלא אם תבחרו בהגדרות הקורס שבינה מלאכותית תחשב את הניקוד אוטומטית לפי מספר השאלות).",
    color: "hsl(38, 92%, 50%)",
    template: `כותרת: טקסט השאלה

| פריט     | יעד       |
|----------|-----------|
| פריט א   | יעד א     |
| פריט ב   | יעד ב     |
| פריט ג   | יעד ג     |

ניקוד: `,
  },
  {
    id: "sorting",
    title: "שאלת מיון / סידור",
    description: "כתבו רשימה ממוספרת בסדר הנכון. המערכת תערבב את הפריטים והתלמיד יסדר אותם.\nרשמו למטה את הניקוד (אלא אם תבחרו בהגדרות הקורס שבינה מלאכותית תחשב את הניקוד אוטומטית לפי מספר השאלות).",
    color: "hsl(152, 69%, 45%)",
    template: `כותרת: טקסט השאלה

1. פריט ראשון (נכון)
2. פריט שני (נכון)
3. פריט שלישי (נכון)
4. פריט רביעי (נכון)

ניקוד: `,
  },
  {
    id: "open-question",
    title: "שאלה פתוחה (בדיקת AI)",
    description: "כתבו את השאלה בכותרת ואת התשובה לדוגמה בגוף השקופית. ה-AI ישתמש בתשובה לדוגמה כדי לבדוק את תשובת התלמיד.\nרשמו למטה את הניקוד (אלא אם תבחרו בהגדרות הקורס שבינה מלאכותית תחשב את הניקוד אוטומטית לפי מספר השאלות).",
    color: "hsl(340, 75%, 55%)",
    template: `כותרת: טקסט השאלה

תשובה לדוגמה: הטקסט של התשובה הנכונה כאן

ניקוד: `,
  },
]

export const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/converter", label: "יצירת קורס" },
  { href: "/templates", label: "מדריך תבניות" },
  { href: "/teacher-register", label: "רישום מורה" },
  { href: "/contact", label: "צור קשר" },
]
