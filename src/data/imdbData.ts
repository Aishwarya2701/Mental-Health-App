// Simulated IMDb movie reviews dataset
export interface Review {
  id: number;
  review: string;
  sentiment: 'positive' | 'negative';
  rating: number;
  movie: string;
}

export const imdbReviews: Review[] = [
  {
    id: 1,
    review: "This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout. A masterpiece of cinema that deserves all the praise it gets. The cinematography was breathtaking and the soundtrack perfectly complemented every scene.",
    sentiment: 'positive',
    rating: 9,
    movie: "The Shawshank Redemption"
  },
  {
    id: 2,
    review: "Terrible waste of time. The plot was confusing, the acting was wooden, and I couldn't wait for it to end. One of the worst movies I've ever seen. The dialogue was cringe-worthy and the special effects looked cheap and unconvincing.",
    sentiment: 'negative',
    rating: 2,
    movie: "Movie 43"
  },
  {
    id: 3,
    review: "Outstanding performance by the lead actor. The story was compelling and emotionally resonant. This film will stay with you long after the credits roll. Every scene was crafted with care and attention to detail.",
    sentiment: 'positive',
    rating: 8,
    movie: "Forrest Gump"
  },
  {
    id: 4,
    review: "Boring and predictable. The characters were one-dimensional and the ending was disappointing. I expected much more from this highly rated film. The pacing was slow and nothing really happened for most of the runtime.",
    sentiment: 'negative',
    rating: 3,
    movie: "The Happening"
  },
  {
    id: 5,
    review: "Brilliant storytelling with amazing visual effects. The cast delivered powerful performances that brought the characters to life. A true cinematic experience that showcases the best of modern filmmaking.",
    sentiment: 'positive',
    rating: 9,
    movie: "Inception"
  },
  {
    id: 6,
    review: "Completely overrated. The hype was not justified at all. Poor character development and a weak storyline made this a forgettable experience. I don't understand why critics praised this so much.",
    sentiment: 'negative',
    rating: 4,
    movie: "Avatar: The Last Airbender"
  },
  {
    id: 7,
    review: "Exceptional direction and screenplay. The movie tackles complex themes with grace and intelligence. Every actor brought their A-game to create something truly special. A film that deserves multiple viewings.",
    sentiment: 'positive',
    rating: 9,
    movie: "Parasite"
  },
  {
    id: 8,
    review: "Awful acting and terrible script. The movie felt like it was made by amateurs. Nothing about this film worked - not the story, not the performances, not even the music. Complete disaster.",
    sentiment: 'negative',
    rating: 1,
    movie: "The Room"
  },
  {
    id: 9,
    review: "Incredible cinematography and a haunting score. The film creates an atmosphere that is both beautiful and terrifying. The performances are nuanced and the story unfolds perfectly. A modern classic.",
    sentiment: 'positive',
    rating: 8,
    movie: "Blade Runner 2049"
  },
  {
    id: 10,
    review: "Disappointing sequel that ruins the original. The plot holes were enormous and the new characters were annoying. They should have left the franchise alone instead of creating this mess.",
    sentiment: 'negative',
    rating: 3,
    movie: "Independence Day: Resurgence"
  },
  {
    id: 11,
    review: "Masterful storytelling with incredible attention to detail. The film builds tension perfectly and delivers an emotionally satisfying conclusion. The cast chemistry is phenomenal and every scene serves a purpose.",
    sentiment: 'positive',
    rating: 9,
    movie: "The Dark Knight"
  },
  {
    id: 12,
    review: "Boring, slow, and pretentious. The movie tries too hard to be artistic but fails to tell a coherent story. I fell asleep twice trying to watch this. Definitely not worth the time or money.",
    sentiment: 'negative',
    rating: 2,
    movie: "The Tree of Life"
  },
  {
    id: 13,
    review: "Absolutely loved every minute of this film! The humor was perfect, the action sequences were thrilling, and the emotional moments hit just right. A perfect blend of entertainment and substance.",
    sentiment: 'positive',
    rating: 8,
    movie: "Guardians of the Galaxy"
  },
  {
    id: 14,
    review: "Generic and formulaic. Felt like I'd seen this exact movie a dozen times before. No originality or creativity whatsoever. The ending was predictable from the first ten minutes.",
    sentiment: 'negative',
    rating: 4,
    movie: "Transformers: The Last Knight"
  },
  {
    id: 15,
    review: "A beautiful and moving film that explores deep themes with sensitivity and intelligence. The performances are outstanding and the direction is flawless. This is cinema at its finest.",
    sentiment: 'positive',
    rating: 9,
    movie: "Moonlight"
  },
  {
    id: 16,
    review: "Terrible special effects and even worse acting. The story made no sense and the dialogue was laughably bad. I can't believe this got made, let alone released in theaters.",
    sentiment: 'negative',
    rating: 1,
    movie: "Cats"
  },
  {
    id: 17,
    review: "Phenomenal film with incredible performances across the board. The story is gripping from start to finish and the technical aspects are top-notch. A true work of art that will be remembered for years.",
    sentiment: 'positive',
    rating: 10,
    movie: "Goodfellas"
  },
  {
    id: 18,
    review: "Overly long and self-indulgent. The director clearly needed an editor to cut out the unnecessary scenes. What could have been a good 90-minute movie was stretched into a boring 3-hour slog.",
    sentiment: 'negative',
    rating: 3,
    movie: "Justice League"
  },
  {
    id: 19,
    review: "Stunning visuals and an emotionally powerful story. The film succeeds on every level - as entertainment, as art, and as a meaningful exploration of the human condition. Absolutely brilliant.",
    sentiment: 'positive',
    rating: 9,
    movie: "WALL-E"
  },
  {
    id: 20,
    review: "Completely pointless and poorly executed. The plot was nonsensical and the characters were unlikable. I regret spending money on this when there are so many better options available.",
    sentiment: 'negative',
    rating: 2,
    movie: "The Emoji Movie"
  }
];

// Positive and negative word dictionaries for sentiment analysis
export const positiveWords = [
  'amazing', 'awesome', 'brilliant', 'excellent', 'fantastic', 'great', 'incredible', 'love', 'perfect', 'wonderful',
  'outstanding', 'superb', 'magnificent', 'spectacular', 'phenomenal', 'exceptional', 'marvelous', 'terrific',
  'beautiful', 'stunning', 'breathtaking', 'masterpiece', 'compelling', 'engaging', 'powerful', 'moving',
  'emotional', 'touching', 'inspiring', 'uplifting', 'heartwarming', 'delightful', 'charming', 'captivating',
  'thrilling', 'exciting', 'entertaining', 'enjoyable', 'satisfying', 'rewarding', 'impressive', 'remarkable',
  'extraordinary', 'flawless', 'genius', 'masterful', 'skillful', 'talented', 'creative', 'original',
  'innovative', 'fresh', 'unique', 'special', 'memorable', 'unforgettable', 'classic', 'timeless'
];

export const negativeWords = [
  'awful', 'terrible', 'horrible', 'bad', 'worst', 'hate', 'boring', 'stupid', 'disappointing', 'waste',
  'pathetic', 'ridiculous', 'annoying', 'frustrating', 'confusing', 'mess', 'disaster', 'failure',
  'weak', 'poor', 'lacking', 'insufficient', 'inadequate', 'subpar', 'mediocre', 'forgettable',
  'pointless', 'meaningless', 'shallow', 'empty', 'hollow', 'fake', 'artificial', 'forced',
  'cringe', 'awkward', 'uncomfortable', 'painful', 'unbearable', 'unwatchable', 'dull', 'bland',
  'generic', 'cliche', 'predictable', 'formulaic', 'repetitive', 'monotonous', 'tedious', 'sluggish',
  'slow', 'dragging', 'overlong', 'excessive', 'pretentious', 'self-indulgent', 'overrated', 'hyped'
];