---
title: Testing blog
date: 2020-07-03T09:44:32.794Z
coverImage: ../assets/DSC03217.jpg
---

I recently attended 2 great React conferences: React Amsterdam and React Finland where I spoke and together with Artem Sapegin held a workshop on design systems for React developers.

## About conferences

Both conferences were well organized and I liked both of them a lot. Personally, I enjoyed React Finland more since it’s 1) a smaller conference and 2) it’s spread over 2 days so it was less stressful for me. I had a chance to watch more talks, chat with other speakers and attendees and even visit a sauna!

Additionally, what makes ReactFinland special, is the concept of “topics” — pairs of related talks that complement each other — which they introduced this year.

Fun fact: I witnessed how on the very first year ReactFinland unintentionally did “topics” when Patrick Stapfer and Nik Graf (#ViennaMafia FTW) held two complimentary talks on ReasonML right after another. Everyone loved this and this year’s program was designed around specific topics like “design systems”, “react native”, “architecture”, etc. What a great example of spontaneous creativity!

I want to focus on the topic that’s close to my heart: design systems and styling on the web.

## Design systems

On the first day of ReactFinland, I had the honor to kick off the “Design Systems” section with my talk “A common language. Let designers and developers talk to each other”. I gave the same talk at React Amsterdam 2 weeks ago and it’s my take on using UI primitives as a common language between designers and developers.

Check out the [slides](https://speakerdeck.com/okonet/a-common-design-language) and recordings from [ReactAmsterdam](https://www.youtube.com/watch?v=3ggoo6AH8Uo&list=PLK-jsWLql4PzBnryd4ApvP2gbPUKkltuW&index=14&t=0s) or [ReactFinland](https://www.youtube.com/watch?v=a6DtiGhKMdk)

Next, Varya Stepanova continued with a presentation about the automation of design systems and processes inside organizations. Her talk showed that component library is just one aspect of the design system and there is so much more to it. [Watch Varya’s talk](https://www.youtube.com/watch?v=5_lYTicLUbk) and check out [the slides](http://varya.me/react-finland-2019/).

## Styling on the web

On the second day, we had a section dedicated to styling on the web. @iamsapegin kicked off with the talk “Custom CSS is the path to inconsistent UI” which is a great continuation on the ideas I outlined on the first day. His talk is also very relevant to what we teach during our Component-driven Design Systems workshop.

/IMG_3886.jpeg

As a takeaway of Artem’s talk, I would highlight: _we should stop writing CSS in our application code because it’s too expressive. Instead, we should use primitive components._

Check out [the slides](https://stopwritingcss.netlify.com/) and [the recording](https://www.youtube.com/watch?v=_CsBRkRTzIA).

Continuing, Artem Zakharchenko delivered a [stunning presentation](https://www.youtube.com/watch?v=_HrXUB97xQs) of his JavaScript library that enables simpler layout composition in React. Managing white space in a consistent way is a hard problem and I think his approach using _layout primitives_ simplifies things a lot. I can’t wait to use [atomic-layout](https://github.com/kettanaito/atomic-layout) library in one of my projects.

## Tooling

I’d like to highlight 2 more talks related to design systems from both conferences.

One is called “Designing with React” by Mark Dalgleish from ReactAmsterdam. Mark created a tool called [“Playroom”](https://github.com/seek-oss/playroom) (it’s open source!) that allows developers and designers “simultaneously design across a variety of themes and screen sizes” using JSX without spending any time to set everything up (zero-config FTW). I’m not sure if it can compete with more “visual” tools like Framer X but I definitely like the idea of designing in a real medium.

[Watch Mark’s talk](https://www.youtube.com/watch?v=W81dlS5G8Gs)

“Scalable (Design) Systems with TypeScript” by [Tejas Kumar](https://twitter.com/TejasKumar_) is the another one from ReactFinland. Tejas showed how static types can improve robustness of the design system especially when the team size starts to grow.

I recently built a component library for one of my clients using TypeScript and I’m totally sold on the idea of using statically typed language for design systems.

What really impressed me, though, is the fact Tejas built the Monaco editor into [react-styleguidist](https://react-styleguidist.js.org) to get better TypeScript support _in the browser_! [Watch the talk](https://www.youtube.com/watch?v=ZsBW4S8hYMU)

Tejas, Artem and I already talked about how we can allow and make such integrations easier in styleguidist. That’s the biggest value of going conferences: so much can be discussed in so little time when you’re in the same room!

## Conclusion

Both conferences were great and I can recommend visiting both. If you’re looking for a bigger crowd, go Amsterdam. If you like smaller conferences, visit Finland. Both are worth attending.
