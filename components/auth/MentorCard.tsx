export default function MentorCard() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md shadow-xl border border-white/20">
      <div className="flex items-center mb-6">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Mentor"
          className="w-16 h-16 rounded-full mr-4 border-2 border-white/30"
        />
        <div>
          <h3 className="text-white font-semibold text-xl">Sarah Johnson</h3>
          <p className="text-white/80 text-sm">Senior Product Mentor</p>
        </div>
      </div>
      <blockquote className="text-white text-lg italic leading-relaxed">
        &ldquo;Grow confidently with support from skilled mentors who care&rdquo;
      </blockquote>
    </div>
  );
}
