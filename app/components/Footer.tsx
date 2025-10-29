export default function Footer() {
  return (
    <footer className="hidden md:block py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} رستوران غذای خونگی مامان پز — تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}