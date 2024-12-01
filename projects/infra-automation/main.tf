provider "aws" {
  region = var.region
}

module "vpc" {
  source = "./modules/vpc"

  environment = var.environment
  vpc_cidr    = var.vpc_cidr
  
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
  db_subnets      = var.db_subnets
}

module "ec2" {
  source = "./modules/ec2"

  environment     = var.environment
  vpc_id         = module.vpc.vpc_id
  public_subnets = module.vpc.public_subnet_ids
  
  instance_type  = var.instance_type
  key_name       = var.key_name
}

module "rds" {
  source = "./modules/rds"

  environment    = var.environment
  vpc_id        = module.vpc.vpc_id
  db_subnets    = module.vpc.db_subnet_ids
  
  db_name       = var.db_name
  db_username   = var.db_username
  db_password   = var.db_password
}

module "elasticache" {
  source = "./modules/elasticache"

  environment     = var.environment
  vpc_id         = module.vpc.vpc_id
  cache_subnets  = module.vpc.private_subnet_ids
  
  node_type      = var.cache_node_type
  num_cache_nodes = var.num_cache_nodes
}

module "alb" {
  source = "./modules/alb"

  environment    = var.environment
  vpc_id        = module.vpc.vpc_id
  subnets       = module.vpc.public_subnet_ids
  
  instance_ids  = module.ec2.instance_ids
}
