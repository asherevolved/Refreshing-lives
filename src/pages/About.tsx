import React from 'react';
import Newsletter from '../components/Newsletter';
import { Heart, Leaf, Users, Target, Star, Shield, Compass, Zap } from 'lucide-react';

const About: React.FC = () => {
  const coreValues = [
    {
      icon: Star,
      title: "Value Creation",
      description: "The most successful organizations understand that the purpose of any business/services is to create value for individuals, customers, employers & employees and investors."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Adherence to moral and ethical principles in all our interactions and decisions."
    },
    {
      icon: Compass,
      title: "Stewardship",
      description: "Accountability, responsibility, mentoring and being an example for others to follow."
    },
    {
      icon: Zap,
      title: "Transformation",
      description: "A reformation that brings changes in cultural, social, spiritual and business/services that leaves a legacy behind."
    }
  ];

  const mottoPoints = [
    {
      icon: Heart,
      title: "Generosity and Refreshment",
      description: "The verse states that a generous person will prosper, and whoever refreshes others will be refreshed."
    },
    {
      icon: Target,
      title: "Positive Outcomes",
      description: "The proverb suggests that acts of kindness and generosity can lead to positive outcomes, both for the giver and the receiver."
    },
    {
      icon: Leaf,
      title: "Well-being",
      description: "The concept of being 'refreshed' implies a sense of well-being, renewal, and positive energy."
    },
    {
      icon: Users,
      title: "Prosperity",
      description: "The verse uses the word 'prosper' which can be interpreted as flourishing, thriving, and experiencing abundance."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
      {/* Hero Section */}
      <section className="text-center mb-24">
        <h1 className="font-merriweather font-bold text-5xl md:text-6xl text-charcoal mb-8">
          About Refreshing Lives
        </h1>
        <p className="font-montserrat text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Welcome to a space dedicated to mindful living, sustainable practices, and the beautiful 
          journey of personal growth. This is where intention meets action, and small changes 
          create lasting transformation.
        </p>
      </section>

      {/* Motto Section */}
      <section className="mb-24">
        <div className="bg-gradient-to-br from-forest-green to-sage-green rounded-3xl p-12 md:p-16 text-center text-white mb-16">
          <h2 className="font-merriweather font-bold text-4xl mb-8">
            Our Motto
          </h2>
          <p className="font-montserrat text-xl max-w-5xl mx-auto leading-relaxed italic">
            "A generous person will prosper; whoever refreshes others will be refreshed."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mottoPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-forest-green/10 rounded-2xl">
                  <point.icon className="h-8 w-8 text-forest-green" />
                </div>
                <h3 className="font-merriweather font-bold text-xl text-charcoal">
                  {point.title}
                </h3>
              </div>
              <p className="font-montserrat text-gray-600 text-lg leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-24">
        <div className="bg-white rounded-3xl p-12 md:p-16 border border-gray-100 shadow-sm">
          <h2 className="font-merriweather font-bold text-4xl text-charcoal mb-8 text-center">
            Our Mission
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed text-center">
            To be an Organization committed to quality of service by having the best people with 
            knowledge, expertise, capital and partnering with the best clients to deliver value.
          </p>
        </div>
      </section>

      {/* Purpose Statement */}
      <section className="mb-24">
        <div className="bg-light-sage/20 rounded-3xl p-12 md:p-16 border border-sage-green/30">
          <h2 className="font-merriweather font-bold text-4xl text-charcoal mb-8 text-center">
            Our Purpose
          </h2>
          <p className="font-montserrat text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed text-center">
            Aspired with a call to serve amongst the downtrodden that would give opportunities to 
            uplift and enhance their quality of living by promoting Arts, Commerce, Literature, 
            Science, Spiritual Insights & Theology.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-24">
        <header className="text-center mb-16">
          <h2 className="font-merriweather font-bold text-4xl text-charcoal mb-6">
            Our Core Values
          </h2>
          <p className="font-montserrat text-gray-600 text-xl max-w-3xl mx-auto">
            These principles guide everything we do and share, creating a foundation 
            for meaningful growth and positive impact.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreValues.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-forest-green/10 rounded-2xl">
                  <value.icon className="h-8 w-8 text-forest-green" />
                </div>
                <h3 className="font-merriweather font-bold text-2xl text-charcoal">
                  {value.title}
                </h3>
              </div>
              <p className="font-montserrat text-gray-600 text-lg leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Section */}
      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-merriweather font-bold text-4xl text-charcoal mb-8">
              Hello, I'm Antony Suneel
            </h2>
            <div className="font-montserrat text-gray-600 text-lg leading-relaxed space-y-6">
              <p>
                Five years ago, I found myself overwhelmed by the constant rush of modern life. 
                Despite outward success, I felt disconnected from what truly mattered. That's when 
                I began exploring mindfulness, sustainable living, and the art of intentional choice-making.
              </p>
              <p>
                What started as a personal quest for balance has evolved into a passion for sharing 
                the tools, insights, and practices that have transformed my relationship with stress, 
                consumption, and personal growth. I believe that wellness isn't about perfection—it's 
                about progress, compassion, and finding what works for your unique life.
              </p>
              <p>
                Through Refreshing Lives, I share the lessons I'm learning, the practices that sustain me, 
                and the belief that small, mindful changes can create ripples of positive impact that 
                extend far beyond ourselves.
              </p>
              <p>
                When I'm not writing, you'll find me tending to my garden, practicing yoga, 
                experimenting with plant-based recipes, or exploring the beautiful Pacific Northwest 
                around Ballari, Karnataka with my rescue dog, Luna.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/WhatsApp Image 2025-06-06 at 10.07.23 PM copy.jpeg"
                  alt="Founder of Refreshing Lives"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-forest-green rounded-3xl p-4 shadow-xl">
                <img 
                  src="/ChatGPT Image Jun 6, 2025, 08_30_48 PM.png" 
                  alt="Refreshing Lives Logo" 
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-merriweather font-bold text-4xl text-charcoal mb-8">
            Looking Forward
          </h2>
          <div className="font-montserrat text-gray-600 text-lg leading-relaxed space-y-6">
            <p>
              As we continue growing this community, I'm excited about expanding our resources 
              to include online workshops, seasonal wellness challenges, and deeper explorations 
              of sustainable living practices.
            </p>
            <p>
              My goal is to create a space where vulnerability is welcomed, questions are encouraged, 
              and everyone feels supported in their unique journey toward a more intentional life. 
              Because the truth is, we're all figuring it out as we go—and that's exactly as it should be.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default About;