import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleImages = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&auto=format&fit=crop&q=80"
];

const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
];

const movieTitles = [
  "Big Buck Bunny",
  "Sintel",
  "Tears of Steel",
  "Elephant's Dream",
  "For Bigger Blazes",
  "For Bigger Escape",
  "For Bigger Fun",
  "For Bigger Joyrides",
  "For Bigger Meltdowns",
  "Subaru Outback On The Edge",
  "We Are Going On Bullrun",
  "What Care Can Do"
];

const descriptions = [
  "Three rodents bully the animals of the forest, but one bunny decides to take a stand.",
  "A lonely young woman helps and befriends a baby dragon whom she names Scales.",
  "In a dystopian future, a group of warriors and scientists try to save the planet from robots.",
  "Two strange characters explore a surreal mechanical world.",
  "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.",
  "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
  "Introducing Chromecast. Stream your favorite entertainment directly to the big screen.",
  "Chromecast lets you stream your movies, series, and videos easily.",
  "Watch dramatic entertainment streaming straight through your cloud player.",
  "Follow thrill seekers pushing the limits in extreme rugged terrains.",
  "The official overview and behind the scenes footage of the Bullrun rally event.",
  "A showcase on automotive precision, technical dedication, and speed."
];

const genres = ["Action", "Sci-Fi", "Comedy", "Drama", "Thriller", "Adventure", "Animation"];
const fullDataset: any[] = [];

for (let i = 1; i <= 50; i++) {
  const index = (i - 1) % movieTitles.length;
  fullDataset.push({
    title: `${movieTitles[index]} ${i > movieTitles.length ? `Part ${Math.floor(i / movieTitles.length) + 1}` : ''}`.trim(),
    description: `${descriptions[index]} (Edition #${i})`,
    videoUrl: sampleVideos[index],
    thumbnailUrl: sampleImages[index],
    genre: genres[i % genres.length],
    duration: `${(i * 3) % 90 + 15}m`
  });
}

async function main() {
  console.log("Seeding 50 movies with high quality working thumbnails to MongoDB...");
  await prisma.movie.deleteMany({});
  await prisma.movie.createMany({
    data: fullDataset
  });
  console.log("Successfully seeded 50 movies!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
