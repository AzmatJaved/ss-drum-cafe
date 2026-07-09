/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquare, Plus, PenTool } from 'lucide-react';
import { DEFAULT_REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: '' // No person image
    };

    setReviews([newReview, ...reviews]);
    
    // Reset Form
    setName('');
    setRating(5);
    setComment('');
    setShowForm(false);
  };

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div id="reviews-section" className="space-y-6">
      {/* Overview Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-none border border-white/10 bg-[#121212]/40 p-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="rounded-none bg-black p-3 border border-white/10 text-brand-gold">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">Rhythm Reviews</h4>
            <p className="text-xs text-zinc-400 mt-0.5 font-light">Average score based on genuine dining memories.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="font-display text-3xl font-light text-brand-gold">{averageRating}</span>
            <div className="flex justify-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.round(parseFloat(averageRating))
                      ? 'fill-brand-gold text-brand-gold'
                      : 'text-zinc-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 block mt-1 uppercase tracking-widest font-mono">{reviews.length} Feedbacks</span>
          </div>

          <button
            id="write-review-toggle-btn"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-none border border-white/10 bg-black px-4 py-3 text-xs font-bold text-brand-gold hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-200 uppercase tracking-widest"
          >
            <PenTool className="h-3.5 w-3.5" />
            Write Feedback
          </button>
        </div>
      </div>

      {/* Write review form */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          id="review-submission-form"
          className="rounded-none border border-white/10 bg-[#0C0C0C] p-5 space-y-4 animate-fadeIn"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">
                Your Nickname
              </label>
              <input
                id="review-name-input"
                type="text"
                required
                placeholder="e.g. Satyam G."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-none border border-white/10 bg-[#121212] p-2.5 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
              />
            </div>

            {/* Star Picker */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">
                Your Rating
              </span>
              <div className="flex gap-1 py-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    id={`review-star-btn-${num}`}
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    onMouseEnter={() => setHoverRating(num)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-0.5 text-zinc-500 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        num <= (hoverRating ?? rating)
                          ? 'fill-brand-gold text-brand-gold'
                          : 'text-zinc-800'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">
              Your Review / Experience
            </label>
            <textarea
              id="review-comment-input"
              rows={3}
              required
              placeholder="How were the beats, brew, and bites? Tell us about the drum seating!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
            />
          </div>

          <div className="flex justify-end gap-3.5 pt-1">
            <button
              id="review-cancel-btn"
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              id="review-submit-btn"
              type="submit"
              className="rounded-none bg-brand-gold text-black font-bold px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-white transition-all duration-200"
            >
              Post Memory
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            id={`review-card-${rev.id}`}
            className="rounded-none border border-white/5 bg-[#121212]/30 p-4 space-y-3 hover:border-white/15 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-none bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center font-heading text-xs font-bold uppercase shrink-0">
                  {rev.name.charAt(0) || 'U'}
                </div>
                <div>
                  <h5 className="font-heading text-xs font-bold text-zinc-200">{rev.name}</h5>
                  <span className="text-[10px] text-zinc-500 block">{rev.date}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < rev.rating
                        ? 'fill-brand-gold text-brand-gold'
                        : 'text-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-heading italic pl-2 border-l border-brand-gold/45">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
