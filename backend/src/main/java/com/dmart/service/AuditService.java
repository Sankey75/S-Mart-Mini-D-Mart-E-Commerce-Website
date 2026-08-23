package com.dmart.service;

import com.dmart.entity.AuditLog;
import com.dmart.entity.User;
import com.dmart.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logAction(User user, String action, String entityType, Long entityId, String description) {
        AuditLog log = new AuditLog();
        log.setUser(user);
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setDescription(description);
        auditLogRepository.save(log);
    }
}
