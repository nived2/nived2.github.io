# Application Monitoring Stack

Comprehensive monitoring solution for a 3-tier application using Prometheus and Grafana, with Redis monitoring and custom dashboards.

## Monitoring Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  App        │     │ Prometheus  │     │  Grafana    │
│  Metrics    │ ──► │ Time-series │ ──► │ Dashboards  │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                   │
      │                    │                   │
      ▼                    ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Redis     │     │  Database   │     │   System    │
│  Metrics    │     │  Metrics    │     │  Metrics    │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Features

- Real-time application metrics
- Redis performance monitoring
- Database performance tracking
- Custom Grafana dashboards
- Automated alerts
- Historical data analysis

## Tech Stack

- Prometheus for metrics collection
- Grafana for visualization
- Redis Exporter
- Node Exporter
- AlertManager
- Docker & Docker Compose

## Monitored Metrics

### Application Metrics
- Request rates
- Response times
- Error rates
- API endpoint usage
- User sessions

### Redis Metrics
- Memory usage
- Connection count
- Command execution rate
- Cache hit/miss ratio
- Eviction rate

### System Metrics
- CPU usage
- Memory utilization
- Disk I/O
- Network traffic
- Container metrics

## Dashboard Examples

### Application Overview
- Request rate by endpoint
- Error rate timeline
- Average response time
- Active users
- Session duration

### Redis Performance
- Memory usage timeline
- Operations per second
- Cache hit ratio
- Connected clients
- Command latency

### System Health
- CPU load
- Memory consumption
- Disk usage
- Network I/O
- Container status

## Setup Instructions

1. Start the monitoring stack:
   ```bash
   docker-compose up -d
   ```

2. Access Grafana:
   - URL: http://localhost:3000
   - Default credentials: admin/admin

3. Import dashboards:
   - Navigate to Dashboards > Import
   - Upload JSON files from dashboards/

## Configuration

### prometheus.yml
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'app'
    static_configs:
      - targets: ['app:8080']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### Alert Rules
```yaml
groups:
  - name: app_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
```

## Alerting

- Email notifications
- Slack integration
- PagerDuty integration
- Custom webhook support
- Alert escalation policies

## Best Practices

- Regular dashboard updates
- Metric retention policies
- Alert threshold tuning
- Backup of configurations
- Documentation maintenance
