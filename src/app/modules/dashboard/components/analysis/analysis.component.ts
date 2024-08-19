import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data.service';
import { IUser } from '../../models/user-data.interface';
import { IChart } from '../../../shared/model/chart.interface';
import { IUtilityData } from '../../models/utility-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  public selectedUser!: IUser;
  public chartData: IChart | undefined;
  constructor(private _dataService: UserDataService, private _router: Router) {}

  ngOnInit(): void {
    this._dataService.getSelectedUser$()?.subscribe({
      next: (selectedUser: IUser | null) => {
        if (!selectedUser) {
          return;
        }
        this.selectedUser = selectedUser;
        this.chartData = this.getChartData(selectedUser) ?? undefined;
      },
    });
  }

  private getChartData(user: IUser | undefined): IChart | undefined {
    const documentStyle = getComputedStyle(document.documentElement);
    if (!user) {
      return;
    }
    let labels: string[] = [];
    let datasets: any = [];
    const usageMap: { [key: string]: number[] } = {};
    if (user.utilities) {
      user.utilities.forEach((utility: IUtilityData) => {
        labels.push(utility.month);
        labels = [...new Set(labels)];
        if (!usageMap[utility.type]) {
          usageMap[utility.type] = [];
        }
        usageMap[utility.type].push(utility.usage);
      });
      datasets = [
        ...Object.keys(usageMap).map((type) => {
          switch (type) {
            case 'gas':
              return {
                type: 'line',
                label: 'Gas',
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                data: usageMap[type],
              };
            case 'electric':
              return {
                type: 'bar',
                label: 'Electric',
                backgroundColor: documentStyle.getPropertyValue('--blue-800'),
                data: usageMap[type],
              };
            case 'energy':
              return {
                type: 'bar',
                label: 'Energy',
                backgroundColor: documentStyle.getPropertyValue('--teal-400'),
                borderColor: 'white',
                borderWidth: 2,
                data: usageMap[type],
              };
            default:
              return {
                type: '',
                label: '',
                data: [],
              };
          }
        }),
      ];
    }

    return {
      labels,
      datasets,
    };
  }

  public navToUsersList(): void {
    this._router.navigate([''])

  }
}
