import { favoritesRepository, ratingsRepository, ridersRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function getCoastersNumberByUser(userId: number) {
    const coastersCount = await ridersRepository.getCoastersCountByUserId(userId);
    return { userCoastersCount: coastersCount };
}

async function getRidedOrNot(userId: number, coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    const riderEntry = await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId);
    if (riderEntry) return true;
    return false;
}

async function postRiderEntry(userId: number, coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    if (await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId)) throw new Error();
    await ridersRepository.createRiderEntryByUserAndCoasterId(userId, coasterId);
}

async function deleteRiderEntry(userId: number, coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
    if (!await ridersRepository.getRiderEntryByUserAndCoasterId(userId, coasterId)) throw new Error("rider entry not found");
    await favoritesRepository.deleteFavoritesByCoasterAndUserId(userId, coasterId);
    await ratingsRepository.deleteRatingByCoasterAndUserId(coasterId, userId);
    await ridersRepository.deleteRiderEntryByUserAndCoasterId(userId, coasterId);
}

export const ridersService = {
    getCoastersNumberByUser,
    getRidedOrNot,
    postRiderEntry,
    deleteRiderEntry
};
