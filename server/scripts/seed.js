const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/user');
const ConnectionRequest = require('../src/models/connectionRequest');
require('dotenv').config();

const sampleUsers = [
  {
    firstName: 'John',
    lastName: 'Developer',
    emailId: 'john@devconnect.com',
    password: 'Password123!',
    age: 28,
    gender: 'male',
    about: 'Full-stack developer passionate about React, Node.js, and building scalable applications. Love open source and contributing to the developer community.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Sarah',
    lastName: 'Engineer',
    emailId: 'sarah@devconnect.com',
    password: 'Password123!',
    age: 32,
    gender: 'female',
    about: 'Senior software engineer specializing in Python and machine learning. Building AI-powered solutions and mentoring junior developers.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'AWS', 'PostgreSQL'],
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Mike',
    lastName: 'Coder',
    emailId: 'mike@devconnect.com',
    password: 'Password123!',
    age: 25,
    gender: 'male',
    about: 'Frontend developer focused on creating beautiful, accessible user interfaces. Expert in CSS, JavaScript, and modern web frameworks.',
    skills: ['JavaScript', 'CSS', 'Vue.js', 'Webpack', 'Accessibility'],
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Emily',
    lastName: 'Programmer',
    emailId: 'emily@devconnect.com',
    password: 'Password123!',
    age: 29,
    gender: 'female',
    about: 'Mobile app developer with expertise in React Native and iOS development. Creating apps that make a difference in people\'s lives.',
    skills: ['React Native', 'iOS', 'Swift', 'Firebase', 'Redux'],
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Alex',
    lastName: 'TechLead',
    emailId: 'alex@devconnect.com',
    password: 'Password123!',
    age: 35,
    gender: 'others',
    about: 'Technical lead and architect with 10+ years of experience. Passionate about clean code, system design, and team collaboration.',
    skills: ['System Design', 'Java', 'Spring Boot', 'Kubernetes', 'Microservices'],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Lisa',
    lastName: 'DataScientist',
    emailId: 'lisa@devconnect.com',
    password: 'Password123!',
    age: 31,
    gender: 'female',
    about: 'Data scientist and backend developer. Building robust data pipelines and APIs that power modern applications.',
    skills: ['Python', 'Data Science', 'SQL', 'FastAPI', 'Pandas'],
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'David',
    lastName: 'DevOps',
    emailId: 'david@devconnect.com',
    password: 'Password123!',
    age: 33,
    gender: 'male',
    about: 'DevOps engineer focused on automation, CI/CD, and cloud infrastructure. Making deployments smooth and reliable.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  },
  {
    firstName: 'Rachel',
    lastName: 'UXDeveloper',
    emailId: 'rachel@devconnect.com',
    password: 'Password123!',
    age: 27,
    gender: 'female',
    about: 'UX developer and designer. Creating intuitive user experiences through thoughtful design and clean code.',
    skills: ['UX Design', 'Figma', 'React', 'CSS', 'User Research'],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devconnect');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await ConnectionRequest.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`👥 Created ${createdUsers.length} sample users`);

    // Create some sample connection requests
    const connectionRequests = [];
    
    // User 1 sends requests to users 2, 3, 4
    for (let i = 1; i < 4; i++) {
      connectionRequests.push({
        fromUserId: createdUsers[0]._id,
        toUserId: createdUsers[i]._id,
        status: 'interested'
      });
    }

    // User 2 sends requests to users 3, 5
    connectionRequests.push(
      {
        fromUserId: createdUsers[1]._id,
        toUserId: createdUsers[2]._id,
        status: 'interested'
      },
      {
        fromUserId: createdUsers[1]._id,
        toUserId: createdUsers[4]._id,
        status: 'interested'
      }
    );

    // User 3 sends request to user 6
    connectionRequests.push({
      fromUserId: createdUsers[2]._id,
      toUserId: createdUsers[5]._id,
      status: 'interested'
    });

    // Insert connection requests
    if (connectionRequests.length > 0) {
      await ConnectionRequest.insertMany(connectionRequests);
      console.log(`🔗 Created ${connectionRequests.length} sample connection requests`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Users:');
    createdUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.emailId}`);
      console.log(`   Skills: ${user.skills.join(', ')}`);
    });

    console.log('\n🔑 Login Credentials:');
    console.log('All users use password: Password123!');
    console.log('\nExample logins:');
    console.log('- john@devconnect.com / Password123!');
    console.log('- sarah@devconnect.com / Password123!');
    console.log('- mike@devconnect.com / Password123!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();
