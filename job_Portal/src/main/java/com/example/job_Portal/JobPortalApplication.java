package com.example.job_Portal;

import jakarta.persistence.EntityManagerFactory;
import org.hibernate.boot.model.source.spi.PluralAttributeElementNature;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
//@EnableTransactionManagement
public class JobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobPortalApplication.class, args);
	}

//	@Bean
//	public PlatformTransactionManager add(EntityManagerFactory factory){
//		return new JpaTransactionManager(factory);
//	}
}
