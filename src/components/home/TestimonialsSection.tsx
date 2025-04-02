
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
  avatar: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Robert Johnson",
    position: "Private Investor",
    content: "WealthHarbor has completely transformed my investment portfolio. The consistent returns have helped me plan my finances with confidence. The transparency and regular updates keep me informed about my investment performance.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "New York, USA"
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "Business Owner",
    content: "I've been investing with WealthHarbor for over 2 years now and have been consistently impressed by their professionalism and the returns they've delivered. Their customer service team is always responsive and helpful.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "London, UK"
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Financial Advisor",
    content: "As someone who advises clients on investments, I thoroughly researched WealthHarbor before recommending it. Their investment strategy is sound, and the returns are among the most reliable I've seen in this sector.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    location: "Singapore"
  },
  {
    id: 4,
    name: "Emily Torres",
    position: "Retired Professional",
    content: "WealthHarbor has been a cornerstone of my retirement income strategy. The passive income generated has allowed me to maintain my lifestyle without touching my principal investments. Their process is straightforward and efficient.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    location: "Toronto, Canada"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTestimonials, setShowTestimonials] = useState(2); // Number of testimonials to show at once
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + showTestimonials >= testimonials.length ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - showTestimonials : prevIndex - 1
    );
  };
  
  // Adjust number of testimonials shown based on screen size
  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + showTestimonials
  );

  return (
    <section className="section-padding bg-investment-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-investment-navy mb-4">
            What Our Investors Say
          </h2>
          <p className="text-gray-600">
            Don't just take our word for it. Hear from our satisfied investors who have experienced the benefits of investing with WealthHarbor.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow p-8 card-hover">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-investment-navy">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.location}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-investment-gold text-investment-gold" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="italic text-gray-700 border-l-4 border-investment-gold pl-4">
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>
          
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
            <button 
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow hover:bg-investment-navy hover:text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow hover:bg-investment-navy hover:text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index >= currentIndex && index < currentIndex + showTestimonials
                  ? "bg-investment-gold"
                  : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
