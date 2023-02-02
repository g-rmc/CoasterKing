import { ratingsRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function verifyCoasterId(coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
}

async function getRating(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    return await ratingsRepository.getRatingByCoasterAndUserId(coasterId, userId);
}

async function createOrUpdateRatings(userId: number, coasterId: number, grade: number) {
    await verifyCoasterId(coasterId);
    const rating = await ratingsRepository.getRatingByCoasterAndUserId(coasterId, userId);
    if (rating) return await ratingsRepository.updateUserRatingById(rating.id, grade); 
    return await ratingsRepository.createUserRating(coasterId, userId, grade);
}

async function deleteRating(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    await ratingsRepository.deleteRatingByCoasterAndUserId(coasterId, userId);
}

export const ratingsService = {
    getRating,
    createOrUpdateRatings,
    deleteRating
};
