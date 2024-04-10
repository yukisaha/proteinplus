package com.elice.proteinplus.rank.repository;

import com.elice.proteinplus.rank.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankRespository extends JpaRepository<Rank, Long>{

}
