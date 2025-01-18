import { Component, OnInit } from '@angular/core';
import { RiotApiService } from '../services/riot-api.service';
import { Champion, ChampionData } from '../models/model';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weekly-rotation',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, CommonModule],
  providers: [RiotApiService],
  templateUrl: './weekly-rotation.component.html',
  styleUrl: './weekly-rotation.component.css'
})

export class WeeklyRotationComponent implements OnInit {
  title = 'lol-weekly-rotation';
  championIds: number[] = [];
  champions: { id: number; name: string; image: string }[] = [];
  errorMessage: string = '';
  favoriteChampionMastery: any = null;

  constructor(private riotApiService: RiotApiService) {}

  ngOnInit(): void {
    this.riotApiService.getWeeklyRotation().subscribe({
      next: (rotationData) => {
        this.championIds = rotationData.freeChampionIds;


        this.riotApiService.getChampionDetails().subscribe({
          next: (championData: ChampionData) => {
            const championMap = Object.values(championData.data).reduce(
              (map, champ: Champion) => {
                const champKey = parseInt(champ.key);
                map[champKey] = {
                  name: champ.name,
                  image: `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${champ.image.full}`,
                };
                return map;
              },
              {} as Record<number, { name: string; image: string }>
            );

            console.log('Champion Map:', championMap);

            this.champions = this.championIds.map((id) => {
              const champion = championMap[id];
              return {
                id,
                name: champion?.name || 'Unknown Champion',
                image: champion?.image || 'https://via.placeholder.com/64',
              };
            });

            console.log('Mapped Champions:', this.champions);
          },
          error: (err) => {
            console.error('Failed to fetch champion details:', err);
          },
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch champion rotation.';
        console.error(err);
      },
    });
  }

  onFavoriteClick() {
    this.riotApiService.getChampionMastery().subscribe({
        next: (masteryData) => {
            this.riotApiService.getChampionDetails().subscribe({
                next: (championData: ChampionData) => {
                    const champion = Object.values(championData.data).find(
                        (c: Champion) => c.key === '98'
                    );
                    this.favoriteChampionMastery = {
                        ...masteryData,
                        championName: champion?.name || 'Unknown Champion',
                        championImage: champion ? 
                            `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${champion.image.full}` : 
                            'https://via.placeholder.com/150'
                    };
                }
            });
        },
        error: (err) => {
            console.error('Failed to fetch champion mastery:', err);
            this.errorMessage = 'Failed to fetch champion mastery information.';
        }
    });
  }
}
