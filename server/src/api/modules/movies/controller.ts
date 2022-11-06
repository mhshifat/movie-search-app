import { Request, Response } from 'express';
import { moviesService } from "./service";

export const moviesController = {
  async getMovie(req: Request, res: Response) {
    const { movieIdentifier } = req.params;
    const movie = await moviesService.getMovie(movieIdentifier)
  
    res.status(200).json({
      success: true,
      data: movie
    })
  },
  async getMovies(req: Request, res: Response) {
    const { page = 1, limit = 10, search = "" } = req.query;
    const { results, total_results, total_pages } = await moviesService.getMoviesFromES({
      page: +page,
      limit: +limit,
      search: search as string
    });
  
    res.status(200).json({
      success: true,
      data: {
        results,
        total_results,
        total_pages,
        currentPage: +page
      }
    })
  },
  async searchMovies(req: Request, res: Response) {
    const { search = "" } = req.query;
    const result = await moviesService.searchMovies(search as string);
  
    res.status(200).json({
      success: true,
      data: result
    })
  },
  async getMoviesAndPublishToQueue(req: Request, res: Response) {
    try {
      await moviesService.publishMoviesToQueue();
      res.status(200).json({
        success: true,
        data: "Published to queue"
      })
    } catch (err: any) {
      res.status(500).json({
        success: false,
        data: err?.message
      })
    }
  },
}