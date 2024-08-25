export interface Stat {
	status: string
	region: string
	roles: [string]
	results: {
		services: {
			redis: boolean
			database: boolean
		}
		stats: {
			servers_count: number
			online: number
			session: number
			server: {
				active_connections: number
				wait_time: number
				workers: [
					[
						'requests:pageviews',
						{
							wait_time: number
							workers: number
							waiting: number
							idle: number
							time_to_return: number
							recently_blocked_keys: []
							top_keys: []
						}
					],
					[
						'io',
						{
							wait_time: number
							workers: number
							waiting: number
							idle: number
							time_to_return: number
							recently_blocked_keys: [[string, number, string]]
							top_keys: [
								[string, number],
								[string, number],
								[string, number],
								[string, number],
								[string, number]
							]
						}
					],
					[
						'requests:unsupported-users',
						{
							wait_time: number
							workers: number
							waiting: number
							idle: number
							time_to_return: number
							recently_blocked_keys: []
							top_keys: []
						}
					],
					[
						string,
						{
							wait_time: number
							workers: number
							waiting: number
							idle: number
							time_to_return: number
							recently_blocked_keys: []
							top_keys: []
						}
					]
				]
				cpu_load: number
				timers: number
			}
		}
	}
	strict: boolean
	server_issue: null
}
