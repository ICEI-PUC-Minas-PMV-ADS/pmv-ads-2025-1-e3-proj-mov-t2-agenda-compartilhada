import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { EventDto } from './dto/event.dto';
import { GroupDto } from './dto/group.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * GET /dashboard/groups/:userId
   * Retorna a lista de grupos do usuário
   */
  @Get('groups/:userId')
  async getUserGroups(@Param('userId') userId: string): Promise<GroupDto[]> {
    return this.dashboardService.findUserGroups(userId);
  }

  /**
   * GET /dashboard/events/:userId
   * Retorna os próximos eventos (tanto de grupos quanto individuais) do usuário
   */
  @Get('events/:userId')
  async getUpcomingEvents(
    @Param('userId') userId: string,
  ): Promise<EventDto[]> {
    return this.dashboardService.findUpcomingEvents(userId);
  }
}