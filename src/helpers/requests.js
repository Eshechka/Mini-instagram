import axios from "axios";

const baseUrl = "https://apiphotos.xeniaweb.site/api";
const baseStorageUrl = "https://apiphotos.xeniaweb.site/storage";
export const urlPhotos = baseStorageUrl + "/photos";
export const urlAvatars = baseStorageUrl + "/avatars";

export const tokenForAllPhotos =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGYxODY0ZGU5YWY4MzZjMjI3ODkzYTU5YjQ2NTg3ZWIzNzEwNTExMTZjZDM0YmM2YjJhMmE1OTViODAyNjQ2Y2IzYmUzYWIyNDBjMGZkMzkiLCJpYXQiOjE2MzY4NDQ1MzAsIm5iZiI6MTYzNjg0NDUzMCwiZXhwIjoxNjY4MzgwNTMwLCJzdWIiOiIzMiIsInNjb3BlcyI6W119.VuEr1XdyDjXhZ2rP-BEcOJgrYOkTg92cJarFI6UNJ82ytvXBvx37Ms8qU72zo-rx9FtjeGJ2ZGPm2VwuZ_BaxwE525fU_jUiUNsAEy126bvdPp0TD33PyUhWORY5priDh-tScwa6BwD2pS0ccsR-cn9lLFt0X4qLptLIp57nBcRwGk3IWBP22u3BmAu-TZEv8AQEadReC03nLVx4n4_pIaUKo8_LfodDH3skIl-nwwlMXNP8gSybonal_K990QJCYc19X_Ve4AoBT2Upq1Ni9TsJPk4LM5veB4ZEdaaYsNqZL3Svh8qPGOS_UaFXg2HSImdhtcE3tI6Q3wdl5aS1vCbqVIAXHbX4lUuuTmPs4qI0AQTOVUrfgpSrKdAhb2tUoEVLnCE3aZl2j7jRHtFHnUPU2lMHjxfHw-dpzGh5qagGhucOW6vtXGYE_FhjuBMNnjVmSolqOe_2We3XbVN97gxqyJFfk5-iaK2dYivjBQ5mXxolWALG5AchwbK3ihBmO3jrsErr6xgw5pTQE_YkXAExSZK4u7DdfvSxOFWJVq1zaBC1shffGlNCLMNlDOULMSulvVm9_50HwvnBwjrWdCwnIYYr7zAUsdBw4tUYiyNON_L_80_gkZfYj1rVxDYxE41J50ZkrHNFDFESI7iLdeV7Qcnr_xhLeWkXIbFGSR4";

export const requests = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${tokenForAllPhotos}`,
  },
});
