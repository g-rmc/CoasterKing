import { favoritesRepository } from "../../repositories";
import { coastersService } from "../coasters/coasters.service";

async function verifyCoasterId(coasterId: number) {
    if (!await coastersService.verifyExistingCoasterId(coasterId)) throw new Error("coasterId not found");
}

async function getFavoritedOrNot(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    const favoriteEntry = await favoritesRepository.getFavoritesByUserAndCoasterId(userId, coasterId);
    if (favoriteEntry) return true;
    return false;
}

async function postFavoriteEntry(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    if (await favoritesRepository.getFavoritesByUserAndCoasterId(userId, coasterId)) throw new Error();
    await favoritesRepository.createFavoritesByUserAndCoasterId(userId, coasterId);
}

async function deleteFavoriteEntry(userId: number, coasterId: number) {
    await verifyCoasterId(coasterId);
    if (!await favoritesRepository.getFavoritesByUserAndCoasterId(userId, coasterId)) throw new Error("favorite entry not found");
    await favoritesRepository.deleteFavoritesByCoasterAndUserId(userId, coasterId);
}

export const favoritesService = {
    getFavoritedOrNot,
    postFavoriteEntry,
    deleteFavoriteEntry
};
