import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios';

@Injectable()
export class AzureDevOpsService {

    private readonly baseUrl: string;
    private readonly auth: { username: string; password: string };

    constructor(public readonly config: ConfigService) {
        this.baseUrl = this.config.get<string>('app.baseURL') || "";
        this.auth = {
            username: this.config.get<string>('app.aUserName') || "",
            password:this.config.get<string>('app.AdoPAT') || "",
        };
    }

    async getProjects() {
        const url = `${this.baseUrl}/_apis/projects?api-version=7.1-preview.1`;
        const res = await axios.get(url, { auth: this.auth });
        return res.data.value.map((p) => p.name);
    }

    async getTicketCount(state: string) {
        const wiql = {
            query: `
        SELECT [System.Id]
        FROM workitems
        WHERE [System.State] = '${state}'
      `,
        };

        const url = `${this.baseUrl}/_apis/wit/wiql?api-version=7.1-preview.1`;
        const res = await axios.post(url, wiql, { auth: this.auth });

        return {
            state,
            count: res.data.workItems.length,
        };
    }

    async runWIQL(query: string) {
        const url = `${this.baseUrl}/_apis/wit/wiql?api-version=7.1-preview.1`;
        const res = await axios.post(url, { query }, { auth: this.auth });
        return res.data.workItems;
    }
}