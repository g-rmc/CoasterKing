import { ratingsRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function createOrUpdateRatings(userId: number, coasterId: number, grade: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    
    const rating = await ratingsRepository.getRatingByCoasterAndUserId(coasterId, userId);
    if (rating) {
        return await ratingsRepository.updateUserRatingById(rating.id, grade); 
    }
    return await ratingsRepository.createUserRating(coasterId, userId, grade);
}

export const ratingsService = {
    createOrUpdateRatings
};
