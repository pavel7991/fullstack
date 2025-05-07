export interface Stats {
	message?: string
	uniqueAuthorsCount: number
	totalArticles: number
	avgContentLength: number
	maxContentLength: number
	minContentLength: number
	oldestArticleDate: string
	latestArticleDate: string
}
