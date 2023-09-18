import { type PrismaClient, EngagementType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type Context = {
  prisma: PrismaClient;
};

export const videoRouter = createTRPCRouter({
  getRandomVideos: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.prisma.video.findMany({
        where: {
          publish: true,
        },
        include: {
          user: true,
        },
      });

      // Split videos and users into separate arrays
      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.prisma.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        }),
      );

      // Generate an array of indices
      const indices = Array.from(
        { length: videosWithCounts.length },
        (_, i) => i,
      );

      // Shuffle the indices array
      for (let i = indices.length - 1; i > 0; i--) {
        if (indices[i] !== undefined) {
          const j = Math.floor(Math.random() * (i + 1));
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      }
      // Use the shuffled indices to re-order videosWithCounts and users
      const shuffledVideosWithCounts = indices.map((i) => videosWithCounts[i]);
      const shuffledUsers = indices.map((i) => users[i]);

      const randomVideos = shuffledVideosWithCounts.slice(0, input);
      const randomUsers = shuffledUsers.slice(0, input);
      return { videos: randomVideos, users: randomUsers };
    }),
});
