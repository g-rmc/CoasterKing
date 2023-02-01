import { ratingsRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function getRating(userId: number, coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    
    const rating = await ratingsRepository.getRatingByCoasterAndUserId(coasterId, userId);
    return rating;
}

async function createOrUpdateRatings(userId: number, coasterId: number, grade: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    
    const rating = await ratingsRepository.getRatingByCoasterAndUserId(coasterId, userId);
    if (rating) {
        return await ratingsRepository.updateUserRatingById(rating.id, grade); 
    }
    return await ratingsRepository.createUserRating(coasterId, userId, grade);
}

async function deleteRating(userId: number, coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    
    await ratingsRepository.deleteRatingByCoasterAndUserId(coasterId, userId);
}

export const ratingsService = {
    getRating,
    createOrUpdateRatings,
    deleteRating
};
