import { GAME_ROUTE, HELP_ROUTE, MAIN_ROUTE, SANDBOX_ROUTE } from "../utils/constants";
import GamePage from "../pages/GamePage/GamePage";
import HelpPage from "../pages/HelpPage/HelpPage";
import MainPage from "../pages/MainPage/MainPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SandboxPage from "../pages/SandboxPage/SandboxPage";

class Route {
  constructor (public path: string, public element: React.ReactElement) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new Route(MAIN_ROUTE, <MainPage/>),
  new Route(GAME_ROUTE, <GamePage/>),
  new Route(SANDBOX_ROUTE, <SandboxPage/>),
  new Route(HELP_ROUTE, <HelpPage/>),
  new Route('*', <NotFoundPage/>)
]